import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";

interface Props {
  id: string;
  type: string;
  deleteAction: (id: string) => void;
}

export const ConfirmationDialog = ({ id, type, deleteAction }: Props) => {
  return (
    <Dialog>
      <Dialog.Trigger as={Button} variant="ghost" color="error" size="sm">
        <MdDelete size={20} />
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-surface-dark/70">
        <Dialog.Content className="flex flex-col gap-4 text-foreground">
          <div className="flex flex-row justify-between items-center gap-4">
            <Typography type="h6">Подтвердите удаление</Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
            >
              <CgClose size={16} />
            </Dialog.DismissTrigger>
          </div>
          <Typography type="lead">
            Вы точно хотите удалить {type} с id: {id}
          </Typography>
          <div className="flex items-center justify-end gap-2">
            <Dialog.DismissTrigger
              as={Button}
              variant="ghost"
              color="success"
              onClick={() => {
                deleteAction(id);
              }}
            >
              Удалить
            </Dialog.DismissTrigger>
            <Dialog.DismissTrigger as={Button} variant="ghost" color="error">
              Отмена
            </Dialog.DismissTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

interface AllProps {
  label: string;
  isLoading: boolean;
  deleteAction: () => void;
}

export const AllConfirmationDialog = ({
  label,
  isLoading,
  deleteAction,
}: AllProps) => {
  return (
    <Dialog>
      <Dialog.Trigger
        as={Button}
        variant="ghost"
        color="error"
        size="sm"
        isLoading={isLoading}
        className="flex flex-row gap-2 items-center p-2 sm:p-1"
      >
        <div className="flex flex-row gap-2 items-center">
          <MdDelete size={20} />
          <span className="hidden sm:block">Удалить</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-surface-dark/70">
        <Dialog.Content className="flex flex-col gap-4 text-foreground">
          <div className="flex flex-row justify-between items-center gap-4">
            <Typography type="h6">Подтвердите удаление</Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
            >
              <CgClose size={16} />
            </Dialog.DismissTrigger>
          </div>
          <Typography type="lead">Вы точно хотите удалить {label}?</Typography>
          <div className="flex items-center justify-end gap-2">
            <Dialog.DismissTrigger
              as={Button}
              variant="ghost"
              color="success"
              onClick={() => {
                deleteAction();
              }}
            >
              Удалить
            </Dialog.DismissTrigger>
            <Dialog.DismissTrigger as={Button} variant="ghost" color="error">
              Отмена
            </Dialog.DismissTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};
