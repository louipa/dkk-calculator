interface AmountPreviewProps {
  dkkValue: number;
  eurValue: number;
}

export const AmountPreview: React.FC<AmountPreviewProps> = ({
  dkkValue,
  eurValue,
}) => {
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
      <p className="text-blue-900">
        {dkkValue.toFixed(2)} DKK = {eurValue.toFixed(2)} EUR
      </p>
    </div>
  );
};
