import { useAppSelector } from "@/app/hooks/hooks";
import withValidatePageAuthentication from "@/app/hooks/withValidatePageAuthentication";
import LayoutComponent from "@/components/Layout";
import QueryBuilder from "@/components/QueryBuilder";
import { NextPage } from "next";

const QueryVisualizerPage: NextPage = () => {
    const currentQuery = useAppSelector((state) => state.currentQuery.value);
    console.log(currentQuery);
    return (
        <LayoutComponent>
            <QueryBuilder queryParams={currentQuery || undefined} />
        </LayoutComponent>
    );
};

export default withValidatePageAuthentication(QueryVisualizerPage);