import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface FormData {
  businessName: string;
  businessType: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  website: string;
  videoLength: string;
  style: string;
  language: string;
  deadline: string;
  budget: string;
  notes: string;
}

export function useCreatePromoVideoRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<string> => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }

      // Generate a unique reference ID using timestamp
      const referenceId = BigInt(Date.now());

      // Map form data to backend fields
      const title = formData.businessName;
      const url = formData.website || formData.email;
      
      // Concatenate all form fields into description
      const description = `
Contact: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Business Type: ${formData.businessType}
Location: ${formData.city}, ${formData.country}
Video Length: ${formData.videoLength}
Style: ${formData.style}
Language: ${formData.language}
Deadline: ${formData.deadline}
Budget: ${formData.budget}
Notes: ${formData.notes}
      `.trim();

      await actor.createPromoVideoRequest(referenceId, title, description, url);

      return referenceId.toString();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promoVideoRequests'] });
    },
  });
}
