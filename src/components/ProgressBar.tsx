interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-blue-500 h-2.5 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
