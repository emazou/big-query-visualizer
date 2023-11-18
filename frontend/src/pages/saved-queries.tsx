import withValidatePageAuthentication from "@/app/hooks/withValidatePageAuthentication";
import LayoutComponent from "@/components/Layout";
import ListSavedQueries from "@/components/ListSavedQueries";
import { NextPage } from "next";

const SavedQueriesPage: NextPage = () => (
    <LayoutComponent>
        <ListSavedQueries />
    </LayoutComponent>
);

export default withValidatePageAuthentication(SavedQueriesPage);