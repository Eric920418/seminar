"use client";

import { useState, useEffect, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from "ckeditor5";

import translations from "ckeditor5/translations/zh.js";
import "ckeditor5/ckeditor5.css";

const LICENSE_KEY = "GPL";

interface CustomEditorProps {
  onContentChange: (value: string) => void;
}

export default function CustomEditor({ onContentChange }: CustomEditorProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    return () => setIsReady(false);
  }, []);

  const editorConfig = useMemo(() => {
    if (!isReady) return {};

    return {
      toolbar: {
        items: [
          "sourceEditing",
          "|",
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "insertTable",
          "highlight",
          "blockQuote",
          "codeBlock",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        Bookmark,
        CloudServices,
        Code,
        CodeBlock,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Heading,
        Highlight,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Paragraph,
        SourceEditing,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Table,
        TableCellProperties,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
      ],
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "|",
        "bulletedList",
        "numberedList",
      ],
      fontFamily: { supportAllValues: true },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
        ] as any,
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:wrapText",
          "imageStyle:breakText",
          "|",
          "resizeImage",
        ],
      },
      language: "zh",
      licenseKey: LICENSE_KEY,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
      },
      placeholder: "請輸入內容...",
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
      translations: [translations],
    };
  }, [isReady]);

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    if (onContentChange) {
      onContentChange(data); // 傳遞給父組件
    }
  };

  return (
    <div className="editor-wrapper">
      {isReady && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          onChange={handleEditorChange}
        />
      )}
    </div>
  );
}
