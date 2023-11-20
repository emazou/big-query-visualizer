import { FC } from "react";
import { 
    useGetSavedQueriesQuery,
} from "@/features/savedQuery/savedQueryAPI";
import { Empty, Row, Spin } from "antd";
import styles from "@/styles/ListSavedQueries.module.css";
import { isEmpty, map } from "lodash";
import ListComments from "./ListComments";
import SavedQuery from "./SavedQuery";

/**
 * @description Component to display the list of saved queries,
 *  it also allows to see the details of a saved query
 * @returns list of saved queries
 */
const ListSavedQueries: FC = () => {
    const {data, isLoading, refetch} = useGetSavedQueriesQuery(
        null, { refetchOnMountOrArgChange: true}
    );

    return (
        <Row className={styles.list}>
            {
                !isLoading && isEmpty(data?.data) && (
                    <Empty
                        description="No saved queries, you can save a
                            query in the visual query builder"
                    />
                )
            }
            {
                !isLoading ? map(data?.data, (item) => (
                    <div className={styles.card}>
                        <SavedQuery savedQuery={item} refetch={() => refetch()}/>
                        <ListComments refetch={() => refetch()} savedQuery={item} />
                    </div>
                )): (
                    <Spin />
                )
            }
        </Row>
    );
};

export default ListSavedQueries;