// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTwubricData, sortData, removeData,setStartDate, setEndDate,removeDataOutOfRange } from './twubricSlice';

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function App() {
  const dispatch = useDispatch();
  const twubricData = useSelector((state) => state.twubric.data);
  const status = useSelector((state) => state.twubric.status);
  const error = useSelector((state) => state.twubric.error);
  const startDate = useSelector((state) => state.twubric.startDate);
  const endDate = useSelector((state) => state.twubric.endDate);

  useEffect(() => {
    dispatch(fetchTwubricData());
  }, [dispatch]);

  const handleSort = (sortBy) => {
    dispatch(sortData({ sortBy }));
  };

  const handleRemove = (username) => {
    dispatch(removeData({ username }));
  };
  const handleFilter = () => {
    dispatch(removeDataOutOfRange());
  };

  const handleStartDateChange = (e) => {
    dispatch(setStartDate(new Date(e.target.value)));
  };

  const handleEndDateChange = (e) => {
    dispatch(setEndDate(new Date(e.target.value)));
  };

  return (
    <div>
      <h1>Redux Toolkit CRUD App</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
        <label>Start Date: <input type="date" onChange={handleStartDateChange} /></label>
          <label>End Date: <input type="date" onChange={handleEndDateChange} /></label>
          <button onClick={() => handleFilter('join_date')}>Filter</button>
          <button onClick={() => handleSort('total')}>Sort by Total</button>
          <button onClick={() => handleSort('friends')}>Sort by Friends</button>
          <button onClick={() => handleSort('influence')}>Sort by Influence</button>
          <button onClick={() => handleSort('chirpiness')}>Sort by Chirpiness</button>
          <ul>
            {twubricData.map((user) => (
              <li key={user.username}>
                {user.username} - {formatDate(user.join_date)} Total: {user.twubric.total}, Friends: {user.twubric.friends}, Influence: {user.twubric.influence}, Chirpiness: {user.twubric.chirpiness}
                <button onClick={() => handleRemove(user.username)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
