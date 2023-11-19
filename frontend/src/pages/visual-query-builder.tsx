import { useAppSelector } from "@/app/hooks/hooks";
import withValidatePageAuthentication from "@/app/hooks/withValidatePageAuthentication";
import LayoutComponent from "@/components/Layout";
import QueryBuilder from "@/components/QueryBuilder";
import { NextPage } from "next";

/**
 * @description Component to display the query visualizer page
 * @returns query visualizer page
 */
const QueryVisualizerPage: NextPage = () => {
    const currentQuery = useAppSelector((state) => state.currentQuery.value);
    return (
        <LayoutComponent>
            <QueryBuilder queryParams={currentQuery || undefined} />
        </LayoutComponent>
    );
};

export default withValidatePageAuthentication(QueryVisualizerPage);