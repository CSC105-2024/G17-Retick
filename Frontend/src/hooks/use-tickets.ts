import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../api/ticket';

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

import { getRecentTickets } from '../api/ticket';

export function useRecentTickets(limit = 8, category?: string) {
  return useQuery({
    queryKey: ['recent-tickets', limit, category],
    queryFn: () => getRecentTickets(limit, category),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTicketById(id?: string) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id!),
    enabled: !!id,
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
    },
  });
}

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
    },
  });
}
