export interface FormData {
  seat: string;
  serialNumber: string;
  price: string;
}

export interface InitialFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}

export interface DisclaimerProps {
  formData: FormData;
  onConfirm: () => void;
  onGoBack: () => void;
}

export interface ProgressBarProps {
  currentStage: number;
  incrementProgress: (stage: number) => void;
  formData: FormData;
  ticketData: `0x${string}` | null;
}

export interface SuccessUIProps {
  formData: FormData;
}

export const SEAT_OPTIONS = [
  "VIP",
  "General Admission",
  "Student",
  "Developer",
  "General Admission + Taiwan Blockchain Summit 11/18-11/19",
];
