import { motion } from "framer-motion";

type EditInputProp = {
  inputFor: string;
  inputText: string;
  inputType: string;
  inputId: string;
  inputName: string;
  inputValue?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

type EditTextAreaProp = {
  inputFor: string;
  inputText: string;
  inputId: string;
  inputName: string;
  inputValue?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

type EditSelectProp = {
  label: string;
  name: string;
  id: string;
  defaultValue?: string;
  data: PlaceData[] | undefined;
  handleStateChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

type ViewInputProp = {
  heading: string;
  text: string;
};

function EditableInputFIeld(inputProp: EditInputProp) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label htmlFor={inputProp.inputFor} className="block mb-2 text-sm font-semibold text-gray-700">
        {inputProp.inputText}
        {inputProp.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={inputProp.inputType}
        id={inputProp.inputId}
        name={inputProp.inputName}
        required={inputProp.required}
        className={`input-field ${inputProp.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        value={inputProp.inputValue}
        defaultValue={inputProp.defaultValue}
        onChange={inputProp.onChange}
        placeholder={`Enter your ${inputProp.inputText.toLowerCase()}`}
      />
      {inputProp.error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 flex items-center gap-2"
        >
          <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
          {inputProp.error}
        </motion.p>
      )}
    </motion.div>
  );
}

function EditableTextAreaFIeld(inputProp: EditTextAreaProp) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label htmlFor={inputProp.inputFor} className="block mb-2 text-sm font-semibold text-gray-700">
        {inputProp.inputText}
        {inputProp.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={inputProp.inputId}
        name={inputProp.inputName}
        required={inputProp.required}
        className={`input-field resize-none ${inputProp.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        value={inputProp.inputValue}
        defaultValue={inputProp.defaultValue}
        onChange={inputProp.onChange}
        rows={4}
        placeholder={`Enter your ${inputProp.inputText.toLowerCase()}`}
      />
      {inputProp.error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 flex items-center gap-2"
        >
          <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
          {inputProp.error}
        </motion.p>
      )}
    </motion.div>
  );
}

function EditableSelectField(inputProp: EditSelectProp) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label htmlFor={inputProp.id} className="block mb-2 text-sm font-semibold text-gray-700">
        {inputProp.label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id={inputProp.id}
        name={inputProp.name}
        onChange={inputProp.handleStateChange}
        defaultValue={inputProp.defaultValue}
        required
        className={`input-field ${inputProp.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
      >
        <option value="">Select {inputProp.label.toLowerCase()}</option>
        {inputProp.data?.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </select>
      {inputProp.error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 flex items-center gap-2"
        >
          <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
          {inputProp.error}
        </motion.p>
      )}
    </motion.div>
  );
}

function ViewingInputField(inputProp: ViewInputProp) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {inputProp.heading}
      </label>
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium">
        {inputProp.text || <span className="text-gray-400 italic">Not provided</span>}
      </div>
    </motion.div>
  );
}

export { EditableInputFIeld, EditableTextAreaFIeld, EditableSelectField, ViewingInputField };