export type FontProps = {
  children: string;
};

export const AppFonts = {
  headingLarge,
  headingMedium,
  headingSmall,
  headingExtraSmall,
  bodyMedium,
  bodySmall,
};

function headingLarge({ children }: FontProps) {
  return <span className='text-[32px] font-light'>{children}</span>;
}

function headingMedium({ children }: FontProps) {
  return <span className='text-[24px] font-light'>{children}</span>;
}

function headingSmall({ children }: FontProps) {
  return <span className='text-[24px] font-medium'>{children}</span>;
}
function headingExtraSmall({ children }: FontProps) {
  return <span className='text-[18px] font-medium'>{children}</span>;
}

function bodyMedium({ children }: FontProps) {
  return <span className='text-[15px] font-light'>{children}</span>;
}

function bodySmall({ children }: FontProps) {
  return <span className='text-[13px] font-light'>{children}</span>;
}
