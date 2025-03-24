"use client";

import { useState, useEffect, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import {

//   Autoformat,
//   AutoImage,
//   AutoLink,
//   Autosave,
//   BalloonToolbar,
//   BlockQuote,
//   Bold,
//   Bookmark,
//   CloudServices,
//   Code,
//   CodeBlock,
//   Essentials,
//   FindAndReplace,
//   FontBackgroundColor,
//   FontColor,
//   FontFamily,
//   FontSize,
//   Heading,
//   Highlight,
//   HorizontalLine,
//   ImageBlock,
//   ImageCaption,
//   ImageInline,
//   ImageInsertViaUrl,
//   ImageResize,
//   ImageStyle,
//   ImageTextAlternative,
//   ImageToolbar,
//   ImageUpload,
//   Indent,
//   IndentBlock,
//   Italic,
//   Link,
//   LinkImage,
//   List,
//   ListProperties,
//   Paragraph,
//   SourceEditing,
//   SpecialCharacters,
//   SpecialCharactersArrows,
//   SpecialCharactersCurrency,
//   SpecialCharactersEssentials,
//   SpecialCharactersLatin,
//   SpecialCharactersMathematical,
//   SpecialCharactersText,
//   Strikethrough,
//   Table,
//   TableCellProperties,
//   TableProperties,
//   TableToolbar,
//   TextTransformation,
//   TodoList,
//   Underline,
// } from "ckeditor5";

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Base64UploadAdapter,
  Bold,
  CloudServices,
  Code,
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
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from "ckeditor5";

import translations from "ckeditor5/translations/zh.js";
import "ckeditor5/ckeditor5.css";

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
          "insertImage",
          "insertTable",
          "highlight",
          "|",
          "alignment",
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
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        Base64UploadAdapter,
        Bold,
        CloudServices,
        Code,
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
        ImageEditing,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageToolbar,
        ImageUpload,
        ImageUtils,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        Paragraph,
        RemoveFormat,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
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
        "insertImage",
        "|",
        "bulletedList",
        "numberedList",
      ],
      fontFamily: {
        supportAllValues: true,
      },
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
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      image: {
        toolbar: ["imageTextAlternative"],
      },
      initialData: "",
      language: "zh",
      licenseKey: "GPL",
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      menuBar: {
        isVisible: true,
      },
      placeholder: "Type or paste your content here!",
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
