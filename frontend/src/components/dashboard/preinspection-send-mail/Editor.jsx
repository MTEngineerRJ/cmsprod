// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css'; 
// import PropTypes from 'prop-types';

// const Editor = ({ placeholder }) => {
//   const [editorHtml, setEditorHtml] = useState('');
//   const [theme, setTheme] = useState('snow');

//   const handleChange = (html) => {
//     setEditorHtml(html);
//   };

//   const handleThemeChange = (newTheme) => {
//     if (newTheme === 'core') newTheme = null;
//     setTheme(newTheme);
//   };

//   return (
//     <div>
//       <ReactQuill
//         theme={theme}
//         onChange={handleChange}
//         value={editorHtml}
//         modules={Editor.modules}
//         formats={Editor.formats}
//         bounds={'.app'}
//         placeholder={placeholder}
//       />
//       <div className="themeSwitcher">
//         <label>Theme </label>
//         <select onChange={(e) => handleThemeChange(e.target.value)}>
//           <option value="snow">Snow</option>
//           <option value="bubble">Bubble</option>
//           <option value="core">Core</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// Editor.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };

// Editor.formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ];

// Editor.propTypes = {
//   placeholder: PropTypes.string,
// };

// // Note: You don't need ReactDOM.render in functional components; it's used in the root component of the app.
// // ReactDOM.render(
// //   <Editor placeholder={'Write something...'} />,
// //   document.querySelector('.app')
// // );

// export default Editor;
