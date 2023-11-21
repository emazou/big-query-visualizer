import { useCallback, FC, useState, memo, useEffect } from "react";
import { debounce, first, isEmpty } from 'lodash';
import {
    Row, 
    message, 
    Spin, 
    Col, 
    Modal, 
    Empty 
} from "antd";
import { useEducationDataMutation, 
    useGetCountrySummaryQuery, 
    useGetIndicatorSumaryQuery 
} from "@/features/dataQuery/dataQueryAPI";
import styles from "@/styles/QueryBuilder.module.css";
import type { Chart as ChartType, QueryParamsEducationData, SavedQuery } from "@/types";
import Chart from "./Chart";
import FormSaveQuery from "./Forms/FormSaveQuery";
import { useAppDispatch } from "@/app/hooks/hooks";
import { removeCurrentQuery } from "@/features/dataQuery/dataQuerySlice";
import FormQuery from "./Forms/FormQuery";

type Props = {
    queryParams?: SavedQuery;
};
/**
 * @description Component to display the visual query builder, it allows to select a country,
 *  an indicator and a date range to get the data of the selected country and indicator
 * @param queryParams query params to be displayed in the visual query builder seleted by the user
 * @returns visual query builder
 */
const QueryBuilder: FC<Props> = ({ queryParams }) => {
    const [indicatorName, setIndicatorName] = useState<string>('_');
    const [currentQuery, setCurrentQuery] = useState<
        QueryParamsEducationData | undefined>(queryParams);
    const [open, setOpen] = useState<boolean>(false);
    const [typeChart, setTypeChart] = useState<ChartType>('LineChart');
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

    const handlerSubmit = (values: QueryParamsEducationData) => {
        educationData(values)
            .unwrap()
            .then((res) => {
                message.success(res.message);
                setCurrentQuery(values);
            })
            .catch((err) => message.error(err.message));
        dispatch(removeCurrentQuery());
    };

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
                    <h2
                        className={styles.title}
                    >Global Educational Explorer: Discover and Learn</h2>
                </Col>
                <FormQuery
                    countries={countries?.data ||[]}
                    handlerSubmit={handlerSubmit}
                    debouncedLoadOptions={debouncedLoadOptions}
                    indicators={indicators?.data || []}
                    isLoadingCountry={isLoadingCountry}
                    isLoadingIndicator={isLoadingIndicator}
                    isData={!!data}
                    setOpen={setOpen}
                    setTypeChart={setTypeChart}
                />
            </Row>
            <Row justify="center" className={styles.chartContainer}>
                {
                    data && !isLoading && !isError && (
                        <>
                            <h4>{first(data.data)?.indicator_name}
                                - {first(data.data)?.country_name}</h4>
                            <Chart type={typeChart} data={data?.data} />
                        </>
                    )
                }
                {
                    isLoading && (
                        <Spin />
                    )
                }
                {
                    !data && !isLoading && !isError && (
                        <Empty
                            description="No chart to display, you can run 
                                a query in the visual query builder"
                        />
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
