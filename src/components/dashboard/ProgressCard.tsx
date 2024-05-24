import Card from '@/core/cards/Card';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface ProgressCardProps {
  title: string;
  icon: JSX.Element;
  total: number;
  color: string;
  more: number;
}

const ProgressCard = ({
  title,
  icon,
  total,
  color,
  more,
}: ProgressCardProps) => {
  const chartOptions: ApexOptions = {
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    stroke: {
      curve: 'smooth',
    },
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    colors: [color],
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 5,
        left: 0,
        blur: 7,
        opacity: 0.4,
        color,
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
        <div className='flex flex-row items-center justify-between p-6'>
          <div className='flex flex-row items-center'>
            <div className='p-3 bg-slate-100 rounded-full font-semibold text-slate-500 text-3xl'>
              {icon}
            </div>
            <div className='text-lg text-gray-500 pl-4'>{title}</div>
          </div>
          <div className='text-3xl font-semibold'>{total}</div>
        </div>
        <hr className='my-8 mx-6' />
        <div className='grid grid-cols-6 items-center pr-14'>
          <div className='w-full col-span-4'>
            <Chart
              options={state.options}
              series={state.series}
              type='line'
              height={150}
            />
          </div>
          <div className='flex flex-col w-full text-2xl text-gray-500 col-span-2'>
            <div className='flex justify-end leading-loose'>
              <p>
                <span className='text-green-background'>{more}+ </span>more
              </p>
            </div>
            <div>from last week</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressCard;
