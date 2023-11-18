import { EducationData } from '@/types';
import exp from 'constants';
import { first } from 'lodash';
import {FC} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

type Props = {
    type: 'LineChart' | 'BarChart' | 'AreaChart' | 'ComposedChart';
    data: EducationData[];
};

const Chart: FC<Props> = ({ type, data }) => {
    console.log(data);
    return (
        <LineChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis dataKey="value"  />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
    );
}
export default Chart;