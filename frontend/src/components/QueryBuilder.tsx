import { useCallback, FC, useMemo, useState, memo, use, useEffect } from "react";
import { debounce, find, first, isEmpty, map, set } from 'lodash';
import Select from 'react-select';
import { Form, Row, DatePicker, Button, message, Spin, Col, Space, Modal, Tooltip } from "antd";
import { useEducationDataMutation, useGetCountrySummaryQuery, useGetIndicatorSumaryQuery } from "@/features/dataQuery/dataQueryAPI";
import styles from "@/styles/QueryBuilder.module.css";
import type { QueryParamsEducationData, SavedQuery } from "@/types";
import Chart from "./Chart";
import { CaretRightOutlined, SaveOutlined } from "@ant-design/icons";
import FormSaveQuery from "./Forms/FormSaveQuery";
import { useAppDispatch } from "@/app/hooks/hooks";
import { removeCurrentQuery } from "@/features/dataQuery/dataQuerySlice";

const { Item } = Form;
const { RangePicker } = DatePicker;

type Props = {
    queryParams?: SavedQuery;
};

const QueryBuilder: FC<Props> = ({ queryParams }) => {
    const [indicatorName, setIndicatorName] = useState<string>('_');
    const [currentQuery, setCurrentQuery] = useState<QueryParamsEducationData | undefined>(queryParams);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const [educationData, { data, isLoading, isError }] = useEducationDataMutation();
    const { data: countries, isLoading: isLoadingCountry } = useGetCountrySummaryQuery(null, {});
    const { data: indicators, isLoading: isLoadingIndicator } = useGetIndicatorSumaryQuery(
        { indicator_name: indicatorName,
            limit: 70,
            indicator_code: queryParams?.indicator_code || '_' 
        }, { });

    const debouncedLoadOptions = useCallback(debounce((inputValue: string) => {
        if(inputValue.length > 3) setIndicatorName(inputValue);
        if(isEmpty(inputValue)) setIndicatorName('_');
    }, 100), [indicators]);

    const countryOptions = useMemo(() => map(
        countries?.data, 
        (country) => ({ label: country.short_name, value: country.country_code })), 
    [countries?.data]);
    const indicatorOptions = useMemo(() => map(
        indicators?.data, 
        (indicator) => ({ label: indicator.indicator_name, value: indicator.indicator_code })), 
    [indicators?.data]);

    const handlerSubmit = (values: QueryParamsEducationData) => {
        educationData(values)
            .unwrap()
            .then((res) => {
                message.success(res.message)
                setCurrentQuery(values);
            })
            .catch((err) => message.error(err.message));
        dispatch(removeCurrentQuery());
    }

    useEffect(() => {
        if(queryParams) {
            handlerSubmit({
                country_code: queryParams.country_code,
                indicator_code: queryParams.indicator_code,
                end_year: queryParams.end_year,
                start_year: queryParams.start_year,
            });
        }
    }, [queryParams]);
    return (
        <>
        <Row justify="center">
            <Col span={24}>
                <h2 className={styles.title}>Global Educational Explorer: Discover and Learn</h2>
            </Col>
            <Form
                onFinish={(values) => {
                    handlerSubmit({
                        country_code: values.country_code.value,
                        indicator_code: values.indicator_code.value,
                        end_year: values.date_range[1].format('YYYY'),
                        start_year: values.date_range[0].format('YYYY'),
                    });
                }}
            >
                <Row>
                    <Tooltip
                        title="Select a country for your query about world education, you can search by country name"
                    >
                        <Item name='country_code' rules={[{
                            required: true,
                            message: 'Please select a country',
                        }]}>
                                <Select
                                    isLoading={isLoadingCountry}
                                    isSearchable
                                    required
                                    loadingMessage={() => 'Loading...'}
                                    name="country_code"
                                    placeholder="Select a country"
                                    options={countryOptions}
                                    className={styles.selectReact}
                                />
                        </Item>
                    </Tooltip>
                    <Tooltip
                        title="Select an indicator for your query about world education, you can search by indicator name for get more results"
                    >
                    <Item name='indicator_code'>
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
                        title="Select a date range for your query about world education, you can select a range between 1970 and current year"
                    >
                        <Item required name='date_range' 
                        rules={[{
                            required: true,
                            message: 'Please select a date range',
                            validator: (_, value) => {
                                if(!isEmpty(value)) {
                                    if(value[0].year() < 1970 || value[1].year() > 2023 || value[0].year() > value[1].year() || value[0].year() === value[1].year()) {
                                        return Promise.reject(new Error('Please select a valid date range'));
                                    }
                                }
                                return Promise.resolve();
                            }
                        }]}
                        >
                            <RangePicker className={styles.rangePicker} picker="year" />
                        </Item>
                    </Tooltip>
                </Row>
                <Row justify="end">
                    <Space>
                        {
                            data && (
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
        </Row>
            <Row justify="center" className={styles.chartContainer}>
            {
                data && !isLoading && !isError && (
                    <>
                        <h4>{first(data.data)?.indicator_name} - {first(data.data)?.country_name}</h4>
                        <Chart type="LineChart" data={data?.data} />
                    </>
                )
            }
            {
                isLoading && (
                    <Spin />
                )
            }
            </Row>
            <Modal
                open={open && !isEmpty(currentQuery)}
                onCancel={() => setOpen(false)}
                footer={null}
                title="Save query"
            >
                {
                    currentQuery && (
                        <FormSaveQuery query={currentQuery} setOpen={() => setOpen(false)} />
                    )
                }
            </Modal>
        </>
    );
};

export default memo(QueryBuilder);
