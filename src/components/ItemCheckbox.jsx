import React from 'react';

// This component is now "controlled," meaning its state (checked) 
// is managed entirely by the parent (App.jsx) via props.
const ItemCheckbox = ({ id, label, checked, onChange }) => {
    // Note: We remove `useState` here because `checked` and `onChange`
    // handle the state from the parent's `formData`.

    return (
        <label htmlFor={id} className="checkbox-label">
            <input
                id={id}
                name="itemsToProcess" // Common name for the group
                type="checkbox"
                checked={checked}
                onChange={onChange} // Calls the `handleItemChange` function in App.jsx
                className="checkbox-input" // Standard CSS class
            />
            <span className="checkbox-custom"></span> 
            <span className="checkbox-text">{label}</span>
        </label>
    );
};

export default ItemCheckbox;