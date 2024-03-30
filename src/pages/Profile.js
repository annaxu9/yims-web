function Profile({ user, onLogout }) {
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Profile</h2>
        <p>NetID: {user.netid}</p>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>College: {user.college}</p>
        <p>Role: {user.role}</p>
        <p>Points: {user.points}</p>
        <button onClick={onLogout}>Logout</button> {/* Add a logout button */}
      </div>
    );
  }
  
  export default Profile;
  