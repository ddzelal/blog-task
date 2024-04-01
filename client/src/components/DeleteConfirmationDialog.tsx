import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteConfirmationDialog({ open, onClose, onConfirm }: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{"Are you sure you want to delete this post?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>This action cannot be undone.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="warning" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog;
