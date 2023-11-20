import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Chart from '@/components/Chart';
import { EducationData } from '@/types';

jest.mock('recharts', () => ({
    LineChart: () => <div data-testid="line-chart"></div>,
    BarChart: () => <div data-testid="bar-chart"></div>,
    ScatterChart: () => <div data-testid="scatter-chart"></div>,
}));

describe('Chart', () => {
    const mockData = [{ 
        year: 2020, 
        value: 100,
        country_code: 'test',
        country_name: 'test',
        indicator_code: 'test',
        indicator_name: 'test',
    },
    { 
        year: 2010, 
        value: 100,
        country_code: 'test',
        country_name: 'test',
        indicator_code: 'test',
        indicator_name: 'test',
    }] as EducationData[];

    test('renders empty state when there is no data', () => {
        render(<Chart type="LineChart" data={[]} />);
        expect(screen.getByText(/no data to display/i)).toBeInTheDocument();
    });

    test('renders a line chart', () => {
        render(
            <Chart type="LineChart" data={mockData} />
        );
        expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });

    test('renders a bar chart', () => {
        render(
            <Chart type="BarChart" data={mockData} />
        );
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });

    test('renders a scatter chart', () => {
        render(
            <Chart type="JointLineScatter" data={mockData} />
        );
        expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
    });
});