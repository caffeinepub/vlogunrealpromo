import { useMutation } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: async (formData: FormData): Promise<string> => {
      // Generate a unique reference ID using timestamp
      const referenceId = BigInt(Date.now());

      // Simulate async operation (client-side only form)
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real implementation, this could send data to an external service
      // or email API, but for now it's just a client-side lead capture form
      console.log('Form submitted (client-side only):', {
        referenceId: referenceId.toString(),
        ...formData
      });

      return referenceId.toString();
    },
  });
}
