import { Country, IndicatorSummary, QueryParamsEducationData, Chart } from "@/types";
import { CaretRightOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Row, Space, Tooltip } from "antd";
import { isEmpty, map } from "lodash";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import Select from "react-select";
import styles from "@/styles/FormQuery.module.css";

const { Item } = Form;
const { RangePicker } = DatePicker;
const optionChart: Chart[] = ['LineChart', 'BarChart', 'JointLineScatter'];

type Props = {
    countries: Country[];
    indicators: IndicatorSummary[];
    isLoadingCountry: boolean;
    isLoadingIndicator: boolean;
    isData: boolean;
    setTypeChart: Dispatch<SetStateAction<Chart>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handlerSubmit: (values: QueryParamsEducationData) => void
    debouncedLoadOptions: (inputValue: string) => void;
}
/**
 * @description Component to display the form to select a country, 
 * an indicator, a date range and a chart type
 * @param countries 
 * @param indicators
 * @param isLoadingCountry
 * @param isLoadingIndicator
 * @param isData
 * @param setTypeChart
 * @param setOpen
 * @param handlerSubmit
 * @param debouncedLoadOptions
 * @returns  form to select a country, an indicator, a date range and a chart type
 */
const FormQuery: FC<Props> = ({
    countries,
    indicators,
    isLoadingCountry,
    isLoadingIndicator,
    isData,
    setTypeChart,
    setOpen,
    handlerSubmit,
    debouncedLoadOptions
}) => {
    const countryOptions = useMemo(() => map(
        countries, 
        (country) => ({ label: country.short_name, value: country.country_code }))
    , [countries]);

    const indicatorOptions = useMemo(() => map(
        indicators, 
        (indicator) => ({ label: indicator.indicator_name, value: indicator.indicator_code })), 
    [indicators]);
    
    return (
        <Form
            layout="vertical"
            onFinish={(values) => {
                handlerSubmit({
                    country_code: values.country_code.value,
                    indicator_code: values.indicator_code.value,
                    end_year: values.date_range[1].format('YYYY'),
                    start_year: values.date_range[0].format('YYYY'),
                });
            }}
        >
            <Space size={1} wrap className={styles.spaceForm}>
                <Tooltip
                    title="Select a country for your query about 
                world education, you can search by country name"
                >
                    <Item 
                        label="Country"
                        name='country_code'
                        rules={[{
                            required: true,
                            message: 'Please select a country',
                        }]}>
                        <Select
                            isLoading={isLoadingCountry}
                            isSearchable
                            required
                            inputId="country-select"
                            loadingMessage={() => 'Loading...'}
                            name="country_code"
                            placeholder="Select a country"
                            options={countryOptions}
                            className={styles.selectReact}
                        />
                    </Item>
                </Tooltip>
                <Tooltip
                    title="Select an indicator for your query about world education,
                    you can search by indicator name for get more results"
                >
                    <Item 
                        required
                        label="Indicator name (search by name)"
                        name='indicator_code'>
                        <Select
                            isSearchable
                            required
                            name="indicator_code"
                            placeholder="Select an indicator"
                            options={indicatorOptions}
                            onInputChange={debouncedLoadOptions}
                            isLoading={isLoadingIndicator}
                            className={styles.selectReact}
                        />
                    </Item>
                </Tooltip>
                <Tooltip 
                    title="Select a date range for your query about world education, 
                    you can select a range between 1970 and current year"
                >
                    <Item 
                        label="Date range"
                        required 
                        name='date_range' 
                        rules={[{
                            required: true,
                            message: 'Please select a date range',
                            validator: (_, value) => {
                                if(!isEmpty(value)) {
                                    if(value[0].year() < 1970 || value[1].year() > 2023 
                                || value[0].year() > value[1].year() 
                                || value[0].year() === value[1].year()) {
                                        return Promise.reject(
                                            new Error('Please select a valid date range')
                                        );
                                    }
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <RangePicker className={styles.rangePicker} picker="year" />
                    </Item>
                </Tooltip>
                <Item
                    label="Chart type"
                    name='chart_type'
                    rules={[{
                        required: true,
                        message: 'Please select a chart type',
                    }]}
                >
                    <Select
                        placeholder="Select a chart type"
                        onChange={(value) => setTypeChart(value?.value as Chart)}
                        options={
                            map(
                                optionChart, 
                                (option) => ({label: option, value: option})
                            )
                        }
                        className={styles.selectReact}
                    />
                </Item>
            </Space>
            <Row justify="center">
                <Space>
                    {
                        isData && (
                            <Button
                                type="dashed"
                                onClick={() => setOpen(true)}
                                icon={<SaveOutlined />}
                            >Save query</Button>
                        )
                    }
                    <Button  
                        type="primary"
                        icon={<CaretRightOutlined />}
                        htmlType="submit"
                    >
                Run query
                    </Button>
                </Space>
            </Row>
        </Form>
    );
}; 

export default FormQuery;