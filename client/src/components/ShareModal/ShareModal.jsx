import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.6}
      overlayBlur={5}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <PostShare />
    </Modal>
  );
};

export default ShareModal;
