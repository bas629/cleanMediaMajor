import { reverse } from '@cloudinary/url-gen/actions/effect';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextApp } from './components/ContextApp';

function AddFriend() {
  const location = useLocation();
  const id = location.pathname.split('/').at(-1);

  const { BASE_URL } = useContext(ContextApp);
  const [account, setAccount] = useState({});
  const [flag, setFlag] = useState(false);

  console.log(BASE_URL);

  async function getPublicPost() {
    try {
      const post = await fetch(`${BASE_URL}/findById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await post.json();
      console.log('Fetched Data: ', data);

      setAccount(data);
      console.log(account);
      setFlag(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPublicPost();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {flag && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white">
          {/* Account Information */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={account.post.profile_url}
              alt="profile_Img"
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
            <div>
              <p className="text-2xl font-semibold">{account.post.name}</p>
            </div>
          </div>

          {/* Public Posts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {account.post.public_Post.map((p) => (
              <div
                key={p.title}
                className="bg-gray-700 p-4 rounded-lg shadow-md overflow-hidden"
              >
                <p className="text-lg font-semibold mb-4">{p.title}</p>
                {p.post_url.includes('mp4') ? (
                  <video
                    src={p.post_url}
                    width="100%"
                    height="auto"
                    controls
                    className="rounded-lg shadow-lg"
                  ></video>
                ) : (
                  <img
                    src={p.post_url}
                    alt={p.title}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddFriend;
