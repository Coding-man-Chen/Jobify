import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type DeleteJobBtnProps = {
    id:string
}

const DeleteJobBtn = ({id}:DeleteJobBtnProps) => {
    const queryClient = useQueryClient()
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "there was an error",
        });
        return;
      } 
      queryClient.invalidateQueries({queryKey:['jobs']})
      queryClient.invalidateQueries({queryKey:['stats']})
      queryClient.invalidateQueries({queryKey:['charts']})
      toast({
        description:"job removed"
      })
    },
  });
  return <Button size="sm" disabled={isPending} className="md:w-24 w-full" onClick={() => mutate(id)}>{
    isPending ? 'deleting...':'delete'
  }</Button>;
};

export default DeleteJobBtn;
