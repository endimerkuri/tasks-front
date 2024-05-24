import Card from '@/core/cards/Card';
import { useState } from 'react';
import DateFilter from './partials/DateFilter';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface TasksPerPeriodCardProps {
  title: string;
}

const TasksPerPeriodCard = ({ title }: TasksPerPeriodCardProps) => {
  const [dateFilter, setDateFilter] = useState<string>('Daily');

  const onDateFilterSelection = (period: string) => {
    setDateFilter(period);
  };
  const chartOptions: ApexOptions = {
    fill: {
      gradient: {
        opacityFrom: 0.7,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    markers: {
      size: 6,
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  };
  const state = {
    series: [
      {
        name: 'Tasks',
        data: [10, 20, 15, 35, 30, 40, 33],
      },
    ],
    options: chartOptions,
  };

  return (
    <Card>
      <div className='p-5'>
        <div className='flex flex-row p-6 justify-between'>
          <div className='font-semibold text-3xl'>{title}</div>
          <div>
            <DateFilter
              selectedDateFilter={dateFilter}
              onDateFilterSelection={onDateFilterSelection}
            />
          </div>
        </div>
        <div>
          <Chart
            options={state.options}
            series={state.series}
            type='area'
            height={300}
          />
        </div>
      </div>
    </Card>
  );
};

export default TasksPerPeriodCard;
