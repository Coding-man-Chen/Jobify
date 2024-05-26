import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type EditJobPageProps = {
  params: {
    id: string;
  };
};
const EditJobPage = async ({ params }: EditJobPageProps) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJobAction(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
};

export default EditJobPage;
