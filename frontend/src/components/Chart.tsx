import {FC} from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    BarChart,
    Bar,
    Rectangle 
} from 'recharts';
import type { Chart as ChartType, EducationData } from '@/types';
import { isEmpty } from 'lodash';
import { Empty } from 'antd';

type Props = {
    type: ChartType;
    data: EducationData[];
};
/**
 * @description Component to display a chart selected
 * @param type type of chart
 * @param data data to be displayed
 * @returns chart
 */
const Chart: FC<Props> = ({ type = 'BarChart', data }) => {
    const props = {
        width: 600,
        height: 300,
        data: data,
        margin:{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }
    };
    const chartChildren = () => (
        <>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend />
        </>
    );

    return !isEmpty(data) ? (
        <>
            {
                type === 'LineChart' && (
                    <LineChart
                        {...props}
                    >
                        {chartChildren()}
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                )
            }
            {
                type === 'BarChart' && (
                    <BarChart
                        {...props}
                    >
                        {chartChildren()}
                        <Bar 
                            dataKey="value"
                            fill="#8884d8" 
                            shape={<Rectangle radius={[5, 5, 0, 0]} />}
                            cursor='pointer'
                            background={{ fill: '#eee' }}
                        />
                    </BarChart>
                )
            }
        </>
    ):(
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No data to display, please select new filters, especially the year range"
        />
    );
};
export default Chart;