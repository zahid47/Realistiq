import { RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { UseFormReturn } from "react-hook-form";
import { CreateListingSchema } from "@/lib/validators/listing";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type EditorProps = {
  content: string;
  onUpdate: (content: string) => void;
};

const EditorArticle = ({ content, onUpdate }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Tell us a little bit about your property...",
      }),
    ],
    content,
    onUpdate({ editor }) {
      if (editor.getHTML() == "<p></p>") {
        onUpdate("");
        return;
      }
      onUpdate(editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

type Props = {
  form: UseFormReturn<CreateListingSchema, any, undefined>;
};

export default function DescriptionInput({ form }: Props) {
  return (
    <div className="mt-12">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>

            {form.formState.errors.description ? (
              <FormMessage />
            ) : (
              <FormDescription>
                Keep it short and sweet, brag about your property a little!
              </FormDescription>
            )}
            <FormControl>
              <div className="my-2">
                <EditorArticle
                  content={field.value}
                  onUpdate={field.onChange}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
