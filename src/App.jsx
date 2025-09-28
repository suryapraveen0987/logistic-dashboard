import React, { useState } from 'react';
import FormInput from './components/FormInput';
import ItemCheckbox from './components/ItemCheckbox';

// --- Initial Form State & Structure ---
const getInitialState = () => ({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    addressDetails: '',
    prefDate: '',
    prefTime: '',
    specialInstruction: '',
    emergencyContact: '',
    serviceType: 'Pickup',
    // Items state structure is necessary for tracking checkboxes
    items: [
        { id: 'itemShirt', label: 'Shirt', checked: false },
        { id: 'itemPants', label: 'Pants', checked: true },
        { id: 'itemSuits', label: 'Suits', checked: false },
        { id: 'itemDress', label: 'Dress', checked: true },
        { id: 'itemJackets', label: 'Jackets', checked: false },
        { id: 'itemBlouse', label: 'Blouse', checked: false },
        { id: 'itemSkirts', label: 'Skirts', checked: false },
        { id: 'itemTie', label: 'Tie', checked: true },
        { id: 'itemFormal', label: 'Formal Wear', checked: false },
        { id: 'itemCasual', label: 'Casual Wear', checked: false },
    ],
});

// --- Submission Summary Component ---
const SubmissionSummary = ({ data, onBack, onEdit }) => {
    const selectedItems = data.items.filter(item => item.checked).map(item => item.label);

    const summaryFields = [
        { label: 'Service Type', key: 'serviceType' },
        { label: 'Full Name', key: 'fullName' },
        { label: 'Phone Number', key: 'phoneNumber' },
        { label: 'Email Address', key: 'emailAddress' },
        { label: 'Address Details', key: 'addressDetails' },
        { label: 'Preferred Date', key: 'prefDate' },
        { label: 'Preferred Time', key: 'prefTime' },
        { label: 'Special Instruction', key: 'specialInstruction' },
        { label: 'Emergency Contact', key: 'emergencyContact' },
    ];

    return (
        <div className="summary-container">
            <h2 className="summary-heading">Pickup Scheduled Successfully!</h2>
            <p className="section-description">Thank you. Here are the details of your service request.</p>

            <div className="summary-details">
                {summaryFields.map(field => (
                    <div className="summary-group" key={field.key}>
                        <span className="summary-label">{field.label}</span>
                        <div className="summary-value">
                            {data[field.key] || 'N/A'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Items List takes up the full width */}
            <div className="summary-group summary-items-row">
                <span className="summary-label">Items to Process</span>
                {selectedItems.length > 0 ? (
                    <ul className="summary-items-list">
                        {selectedItems.map(item => (
                            <li key={item} className="summary-item">{item}</li>
                        ))}
                    </ul>
                ) : (
                    <div className="summary-value">No items selected.</div>
                )}
            </div>

            <div className="submit-button-container summary-buttons">
                <button type="button" onClick={onEdit} className="submit-button button-back">
                    Edit Details
                </button>
                <button type="button" onClick={onBack} className="submit-button">
                    Schedule Another Pickup
                </button>
            </div>
        </div>
    );
};

// --- Dashboard View Component (Mock Data) ---
const DashboardView = () => {
    const kpis = [
        { label: 'Pickups Today', value: 14, unit: 'Orders', color: '#10b981' },
        { label: 'Items to Process', value: 187, unit: 'Total Items', color: '#f59e0b' },
        { label: 'New Orders (24h)', value: 3, unit: 'New since yesterday', color: '#3b82f6' },
    ];

    const nextPickups = [
        { time: '9:00 AM', customer: 'Praveen P.', address: '123 Main St.', status: 'Pending Dispatch' },
        { time: '11:30 AM', customer: 'Jane Doe', address: '45 Oak Ave.', status: 'Processing' },
        { time: '2:15 PM', customer: 'Chris Lee', address: '78 Elm Dr.', status: 'Pending Dispatch' },
    ];

    return (
        <div className="dashboard-view">
            <h2 className="section-title">Operational Overview</h2>
            <p className="section-description">Monitor real-time status and key metrics for today's operations.</p>

            {/* KPI Cards */}
            <div className="kpi-grid">
                {kpis.map((kpi) => (
                    <div key={kpi.label} className="kpi-card" style={{ borderColor: kpi.color }}>
                        <p className="kpi-label">{kpi.label}</p>
                        <h3 className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</h3>
                        <span className="kpi-unit">{kpi.unit}</span>
                    </div>
                ))}
            </div>

            {/* Next Pickups List */}
            <h3 className="section-title" style={{ marginTop: '2rem' }}>Next Scheduled Pickups</h3>
            <div className="pickup-list">
                {nextPickups.map((pickup, index) => (
                    <div key={index} className="pickup-item">
                        <span className="pickup-time">{pickup.time}</span>
                        <span className="pickup-customer">{pickup.customer}</span>
                        <span className="pickup-address">{pickup.address}</span>
                        <span className={`pickup-status status-${pickup.status.toLowerCase().replace(/\s/g, '-')}`}>{pickup.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Reports View Component (Placeholder) ---
const ReportsView = () => (
    <div className="view-placeholder">
        <h2 className="section-title">Monthly Analytics Reports</h2>
        <p className="section-description">Detailed performance data and customer trends will be generated here.</p>
        <p className="report-text">Chart Placeholder: Pickup Volume vs. Revenue (Last 6 Months)</p>
        <p className="report-text">Data Table Placeholder: Customer Item Breakdown</p>
    </div>
);


function App() {
    // --- State Management ---
    const [formData, setFormData] = useState(getInitialState);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('Schedule'); // State for current active view

    // --- Validation Logic ---
    const requiredFields = [
        'fullName', 'phoneNumber', 'emailAddress', 'addressDetails',
        'prefDate', 'prefTime', 'specialInstruction', 'emergencyContact'
    ];
    
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{8,15}$/;

        requiredFields.forEach(field => {
            const value = formData[field];
            if (!value || value.trim() === '') {
                newErrors[field] = 'This field is required.';
                isValid = false;
            }
        });

        // Specific Format Checks
        if (formData.emailAddress && !emailRegex.test(formData.emailAddress)) {
            newErrors.emailAddress = 'Please enter a valid email address.';
            isValid = false;
        }

        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number (8-15 digits).';
            isValid = false;
        }

        // Ensure at least one item is checked
        if (formData.items.every(item => !item.checked)) {
            newErrors.items = 'Please select at least one item to process.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    // --- Handlers ---
    
    // Handles standard input changes (text, date, time, radio)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error as user types
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Handles checkbox changes (updates the 'items' array in state)
    const handleItemChange = (itemId) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
        }));
        // Clear items error when an item is selected
        if (errors.items) {
            setErrors(prev => ({ ...prev, items: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to the top of the form to show errors immediately
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Start processing status
        setIsProcessing(true);

        // Simulate API call delay
        setTimeout(() => {
            setIsProcessing(false);
            // On success, switch to summary view
            setIsSubmitted(true);
            console.log("Form Submitted Successfully:", formData);
        }, 1500);
    };
    
    // Function to reset the state and go back to the form (resets all data)
    const handleBack = () => {
        setFormData(getInitialState);
        setIsSubmitted(false);
        setErrors({});
        setActiveTab('Schedule'); // Ensure we land back on Schedule view
    };

    // Function to go back to the form but KEEP the current data for editing
    const handleEdit = () => {
        setIsSubmitted(false);
        setActiveTab('Schedule'); // Ensure we land back on Schedule view
    };


    // List of form fields used for rendering and collecting values
    const formElements = [
        { id: 'fullName', label: 'Full Name', type: 'text', required: true, isRow: true, placeholder: 'Enter Details' },
        { id: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, isRow: true, placeholder: 'Enter Details' },
        { id: 'emailAddress', label: 'Email Address', type: 'email', required: true, isRow: false, placeholder: 'Enter Details' },
        { id: 'addressDetails', label: 'Address Details', isTextArea: true, required: true, isRow: false, placeholder: 'Write something...' },
        { id: 'prefDate', label: 'Preffred Date', type: 'date', required: true, isRow: true, placeholder: 'Select Date' },
        { id: 'prefTime', label: 'Preffred Time', type: 'time', required: true, isRow: true, placeholder: 'Select Time' },
    ];
    
    // --- Render Logic ---

    const renderContent = () => {
        if (activeTab === 'Dashboard') {
            return <DashboardView />;
        }
        if (activeTab === 'Reports') {
            return <ReportsView />;
        }
        
        // Default to Schedule view
        if (isSubmitted) {
            return <SubmissionSummary data={formData} onBack={handleBack} onEdit={handleEdit} />;
        }

        // Render Schedule Form
        return (
            <>
                <h2 className="section-title">Schedule Pickup</h2>
                <p className="section-description">Book a pickup service for your laundry and dry cleaning needs</p>

                <form className="form-fields-container" onSubmit={handleSubmit}>
                    {/* --- Service Type Radio Buttons --- */}
                    <div className="service-type-group">
                        <h3 className="service-type-title">Select Service Type</h3>
                        <div className="radio-options">
                            {['Pickup', 'Delivery'].map((type) => (
                                <label key={type} htmlFor={`service-${type}`} className="radio-label">
                                    <input
                                        id={`service-${type}`}
                                        name="serviceType"
                                        type="radio"
                                        value={type}
                                        checked={formData.serviceType === type}
                                        onChange={handleChange}
                                        className="radio-input"
                                        disabled={isProcessing}
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-text">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* --- Form Fields Grid --- */}
                    <div className="form-grid-layout">
                        {formElements.reduce((acc, current, index) => {
                            const next = formElements[index + 1];
                            
                            // Helper function to render a FormInput
                            const renderInput = (data) => (
                                <FormInput 
                                    key={data.id} 
                                    {...data} 
                                    value={formData[data.id]}
                                    onChange={handleChange}
                                    error={errors[data.id]}
                                    disabled={isProcessing}
                                />
                            );

                            // Group two row-elements together (e.g., Name/Phone, Date/Time)
                            if (current.isRow && next && next.isRow) {
                                acc.push(
                                    <div className="input-row" key={current.id}>
                                        {renderInput(current)}
                                        {renderInput(next)}
                                    </div>
                                );
                                // Skip the next element since it was just grouped
                                return acc;
                            }
                            
                            // Skip the second element of a row pair if already grouped
                            if (current.isRow && (index > 0 && formElements[index-1]?.isRow)) {
                                return acc;
                            }

                            // Render standalone inputs (Email, Address)
                            if (!current.isRow) {
                                acc.push(renderInput(current));
                            }

                            return acc;
                        }, [])}
                        
                    </div>
                    
                    {/* --- Items to Process Checkboxes (2-column grid) --- */}
                    <div className="checkbox-section">
                        <h3 className="checkbox-title">Item's to Process</h3>
                        <div className="checkbox-grid">
                            {formData.items.map((item) => (
                                <ItemCheckbox 
                                    key={item.id} 
                                    id={item.id} 
                                    label={item.label} 
                                    checked={item.checked} 
                                    onChange={() => handleItemChange(item.id)}
                                    disabled={isProcessing}
                                />
                            ))}
                        </div>
                        {errors.items && <div className="error-message error-item-select">{errors.items}</div>}
                    </div>
                    
                    {/* Special Instruction & Emergency Contact */}
                    <FormInput 
                        id="specialInstruction" 
                        label="Special Instruction" 
                        placeholder="Write something..." 
                        isTextArea={true} 
                        required={true}
                        value={formData.specialInstruction}
                        onChange={handleChange}
                        error={errors.specialInstruction}
                        disabled={isProcessing}
                    />
                    <FormInput 
                        id="emergencyContact" 
                        label="Emergency Contact" 
                        placeholder="Enter Details" 
                        required={true} 
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        error={errors.emergencyContact}
                        disabled={isProcessing}
                    />


                    {/* --- Submit Button --- */}
                    <div className="submit-button-container">
                        <button type="submit" className="submit-button" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Schedule Pickup'}
                        </button>
                        {isProcessing && <div className="processing-indicator"></div>}
                    </div>

                </form>
            </>
        );
    };


    // --- Main Component Render ---
    return (
        <div className="app-wrapper">
            <div className="bg-accent-shape-large"></div>
            <div className="bg-accent-shape-small"></div>
            
            <div className="form-card">
                
                {/* --- Header & Navigation --- */}
                <header className="header-bar">
                    <div>
                        <h1 className="header-title">Logistic Dashboard</h1>
                        <p className="header-subtitle">Monitor And Manage All Delivery Operations</p>
                    </div>
                    <div className="profile-icon">PP</div>
                </header>

                <div className="nav-tabs">
                    {['Dashboard', 'Schedule', 'Reports'].map((tab) => (
                        <button
                            key={tab}
                            // Set active tab on click
                            onClick={() => setActiveTab(tab)}
                            className={`nav-tab ${tab === activeTab ? 'tab-active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- Conditional View Renderer --- */}
                {renderContent()}
            </div>
        </div>
    );
}

export default App;
