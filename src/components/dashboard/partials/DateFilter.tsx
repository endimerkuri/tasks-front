type SelectedOptionState = [string, (period: string) => void];

interface TabRadioButtonsProps {
  selectedOptionState: SelectedOptionState;
  options?: string[];
  optionWidth?: string;
  textSize?: string;
}

interface DateFilterProps {
  selectedDateFilter: string;
  onDateFilterSelection: (period: string) => void;
}

const TabRadioButtons = ({
  selectedOptionState,
  options = [],
  textSize = 'text-sm',
}: TabRadioButtonsProps) => {
  const [selectedOption, setSelectedOption] = selectedOptionState;

  return (
    <div
      className={`flex flex-col lg:flex-row gap-x-1 items-center px-1 ${textSize} h-full lg:h-9`}
    >
      {options.map((option) => (
        <span
          key={option}
          className={`text-center flex-1 cursor-pointer py-1 px-4 font-semibold
            ${selectedOption === option ? 'border-b-4 border-blue text-blue' : 'hover:text-blue hover:border-b-4 hover:border-blue'}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </span>
      ))}
    </div>
  );
};

const DateFilter = ({
  selectedDateFilter,
  onDateFilterSelection,
}: DateFilterProps) => {
  const dateShortcutOptions = ['Daily', 'Weekly', 'Monthly'];

  const handleFilterChange = (period: string) => {
    onDateFilterSelection(period);
  };

  return (
    <TabRadioButtons
      options={dateShortcutOptions}
      selectedOptionState={[selectedDateFilter, handleFilterChange]}
      className='w-full'
      textSize='text-3xl'
    />
  );
};

export default DateFilter;
