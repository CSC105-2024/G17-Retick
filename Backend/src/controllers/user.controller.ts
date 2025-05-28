import type { Context as HonoContext } from 'hono';

type Context = HonoContext & {
  user?: {
    id: string;
  };
};

import { db } from '../index.ts';

import {
  createUser,
  generateRefreshToken,
  generateToken,
  changeName,
  getUserSoldTickets,
  deleteTicket,
  changePhoneNumber,
  ispasswordMatch,
  updateUser,
} from '../models/user.model.ts';
import { setCookie, deleteCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';

type createUserBody = {
  email: string;
  name: string;
  password: string;
  phone: string;
};

export const getCurrentUserController = async (c: Context) => {
  console.log('Current user:', c.user);
  if (!c.user) return c.json({ message: 'Unauthorized' }, 401);
  const user = await db.user.findUnique({
    where: { id: c.user.id },
    select: { id: true, name: true, email: true, phone: true },
  });

  if (!user) return c.json({ message: 'User not found' }, 404);
  return c.json({ user });
};

export const registerController = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return c.json(
        {
          success: false,
          data: null,
          msg: 'Missing required fields',
        },
        400
      );
    }
    const result = await createUser(email, password, name);
    if (!result.success) {
      return c.json(
        {
          success: false,
          data: null,
          msg: 'User already exists',
        },
        409
      );
    }
    return c.json({
      success: true,
      data: result.user,
      msg: 'Created new user!',
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      501
    );
  }
};

export const loginController = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    const { email, password } = body;
    if (!email || !password) {
      return c.json({ message: 'Missing required fields' }, 400);
    }
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return c.json({ message: 'User not found' }, 404);
    }
    const isPasswordMatch = await ispasswordMatch(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return c.json({ message: 'Invalid password' }, 401);
    }

    const accessToken = generateToken({
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name ?? '',
    });
    const refreshToken = generateRefreshToken(existingUser.id);

    const userResponse = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };

    const isProduction = process.env.NODE_ENV === 'production';
    setCookie(c, 'accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
    });
    setCookie(c, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
    });
    return c.json({ user: userResponse, message: 'Login success.' }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const logoutController = async (c: Context) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';

    deleteCookie(c, 'accessToken', {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    deleteCookie(c, 'refreshToken', {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    return c.json({ success: true, message: 'Logged out successfully.' }, 200);
  } catch (e) {
    console.error('Logout error:', e);
    return c.json({ message: 'Something went wrong.' }, 500);
  }
};

export const refreshTokenController = async (c: Context) => {
  try {
    const cookies = c.req.header('Cookie') || '';
    console.log('Cooddkies:', cookies);
    const refreshToken = cookies
      .split('; ')
      .find((row) => row.startsWith('refreshToken='))
      ?.split('=')[1];
    console.log('Refresh Token:', refreshToken);
    if (!refreshToken) {
      return c.json({ message: 'Refresh token not found' }, 401);
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!
    ) as { id: string };

    if (!decoded?.id) {
      return c.json({ message: 'Invalid refresh token' }, 401);
    }

    const user = await db.user.findUnique({
      where: { id: String(decoded.id) },
    });

    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    // Generate new tokens
    const newAccessToken = generateToken({
      id: user.id,
      email: user.email,
      name: user.name ?? '',
    });

    const newRefreshToken = generateRefreshToken(user.id);

    const isProduction = process.env.NODE_ENV === 'production';

    setCookie(c, 'accessToken', newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    setCookie(c, 'refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    return c.json({ message: 'Token refreshed successfully' }, 200);
  } catch (error) {
    console.error('Refresh token error:', error);
    return c.json({ message: 'Invalid or expired refresh token' }, 401);
  }
};

const generateTokensController = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const existingUser = await db.user.findFirst({
      where: {
        id: String(userId),
      },
    });

    if (!existingUser) {
      throw new Error('User is not existed');
    }

    const { id, email, name } = existingUser;
    if (!email || !name) {
      throw new Error('Email or name cannot be null.');
    }
    const accessToken = generateToken({ id, email, name });
    const refreshToken = generateRefreshToken(id);

    return { accessToken, refreshToken };
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate tokens');
  }
};

export const updateProfileController = async (c: Context) => {
  try {
    if (!c.user) return c.json({ message: 'Unauthorized' }, 401);
    const body = await c.req.json();
    const { name, phone } = body;

    const response = await updateUser(c.user.id, name, phone);
    if (!response.success) {
      return c.json({ message: response.message }, 400);
    }

    return c.json({ message: 'Profile updated', user: response.user }, 200);
  } catch (e) {
    return c.json({ message: 'Update user failed' }, 500);
  }
};

export const updatePhonenumberController = async (c: Context) => {
  try {
    if (!c.user) return c.json({ message: 'Unauthorized' }, 401);

    const user = await db.user.findUnique({
      where: { id: c.user.id },
    });

    if (!user) {
      return c.json({ message: 'User not found' }, 401);
    }

    const { phone } = user;
    if (!phone || typeof phone !== 'string') {
      return c.json({ message: 'Invalid phone number' }, 400);
    }
    const result = await changePhoneNumber(c.user.id, phone);

    if (!result.success || !result.user) {
      return c.json({ message: result.message }, 400);
    }
    const { id, email, name, phone: updatedPhone } = result.user;
    return c.json({
      message: 'Phone Number updated successfully',
      user: {
        id,
        email,
        name,
        phone: updatedPhone,
      },
    });
  } catch (e) {
    console.error('Update username error:', e);
    return c.json({ message: 'Something went wrong' }, 500);
  }
};

// controller for changing the name
export const updateUsernameController = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    const { name } = body;

    if (!name) {
      return c.json({ message: 'Username is required' }, 400);
    }

    const cookies = c.req.header('Cookie') || '';
    const accessToken = cookies
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (!accessToken) {
      return c.json({ message: 'Access token not found' }, 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
      id: string;
    };

    if (!decoded?.id) {
      return c.json({ message: 'Invalid token' }, 401);
    }

    const result = await changeName(String(decoded.id), name);

    if (!result.success || !result.user) {
      return c.json({ message: result.message }, 400);
    }

    const { id, email, name: updatedUsername } = result.user;

    return c.json({
      message: 'Username updated successfully',
      user: {
        id,
        email,
        name: updatedUsername,
      },
    });
  } catch (error) {
    console.error('Update username error:', error);
    return c.json({ message: 'Something went wrong' }, 500);
  }
};

// controlelr for deletion
export const deleteUserTicketController = async (c: Context) => {
  try {
    if (!c.user) return c.json({ message: 'Unauthorized' }, 401);
    const ticketId = c.req.param('ticketId');
    const result = await deleteTicket(ticketId, c.user.id);

    if (!result.success || !c.user.id) {
      return c.json({ message: 'Failed to delete' }, 400);
    }

    const updatedUser = await db.user.update({
      where: { id: c.user.id },
      data: { phone: null },
    });
    return c.json({
      message: 'Phone number removed successfully.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (e) {
    console.error('Error deleting ticket or updating user:', e);
    return c.json({ message: 'Something went wrong' }, 500);
  }
};

// controller for all user sold tickets
export const getUserSoldTicketsController = async (c: Context) => {
  if (!c.user) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const userId = c.user.id;

  const result = await getUserSoldTickets(userId);

  if (!result.success) {
    return c.json({ message: result.message }, 400);
  }

  return c.json({
    message: result.message,
    user: result.user,
    tickets: result.tickets,
  });
};
