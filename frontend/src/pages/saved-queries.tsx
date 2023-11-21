import withValidatePageAuthentication from "@/app/hooks/withValidatePageAuthentication";
import LayoutComponent from "@/components/Layout";
import ListSavedQueries from "@/components/ListSavedQueries";
import { NextPage } from "next";

/**
 * @description Component to display the saved queries page
 * @returns saved queries page
 */
const SavedQueriesPage: NextPage = () => (
    <LayoutComponent>
        <ListSavedQueries />
    </LayoutComponent>
);

export default withValidatePageAuthentication(SavedQueriesPage);