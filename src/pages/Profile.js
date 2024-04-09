function Profile({ user, onLogout }) {
  if (!user) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="font-semibold">NetID:</p>
        <p>{user.netid}</p>

        <p className="font-semibold">First Name:</p>
        <p>{user.firstname}</p>

        <p className="font-semibold">Last Name:</p>
        <p>{user.lastname}</p>

        <p className="font-semibold">College:</p>
        <p>{user.college}</p>

        <p className="font-semibold">Role:</p>
        <p>{user.role}</p>

        <p className="font-semibold">Points:</p>
        <p>{user.points}</p>
      </div>
      <button onClick={onLogout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default Profile;
