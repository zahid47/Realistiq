import { RichTextEditor } from "@mantine/tiptap";
import { ListingDetails } from "@prisma/client";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ScrollArea } from "@/components/ui/scroll-area";

type EditorProps = {
  content: string;
};

const EditorArticle = ({ content }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: false,
    content,
  });

  return (
    <RichTextEditor
      editor={editor}
      styles={{
        root: {
          border: "none",
        },
      }}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

interface Props {
  description: ListingDetails["description"];
}

export default function Description({ description }: Props) {
  return (
    <ScrollArea className="h-[26rem]">
      <EditorArticle content={description} />
    </ScrollArea>
  );
}
