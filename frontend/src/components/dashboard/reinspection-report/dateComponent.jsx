import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the datepicker

function YourComponent() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [policyPeriodStart, setPolicyPeriodStart] = useState(new Date());

  return (
    <div className="col-lg-5">
      {isEditMode ? (
        <div className="input-group">
          <DatePicker
            selected={policyPeriodStart}
            onChange={(date) => setPolicyPeriodStart(date)}
            className="form-control"
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="far fa-calendar-alt"></i>
            </span>
          </div>
        </div>
      ) : (
        <input 
          type="text"
          value={formatDate(policyPeriodStart)}
          readOnly={!isEditMode}
          className="form-control" 
          id="propertyTitle"
        />
      )}
      <button onClick={() => setIsEditMode(!isEditMode)}>Toggle Edit Mode</button>
    </div>
  );
}
