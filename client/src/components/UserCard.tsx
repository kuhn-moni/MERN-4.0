import { User } from "../@types";

type Props = {
  user: User;
};

function UserCard({ user }: Props) {
  return (
    user && (
      <div
        style={{ border: "solid 1px black", padding: "0 1em", width: "300px" }}
      >
        <p>
          <b>{user.username}</b> - {user.email}{" "}
          <img
            src={user.profile_pic}
            alt={`${user.username}'s profile picture`}
            style={{ height: "50px", width: "50px" }}
          />
        </p>
        {user.sports_activities.length === 0 ? (
          <p>No upcoming activities</p>
        ) : (
          <>
            <p>Upocoming activities</p>
            <ul>
              {user.sports_activities.map((p) => {
                return (
                  <li key={p._id}>
                    {p.activity} on {p.date} for {p.duration} with{" "}
                    {p.participant}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    )
  );
}

export default UserCard;
