import { useContext, useState } from "react";
import { FaInfoCircle, FaPen, FaPhoneAlt, FaPlus, FaUser } from "react-icons/fa";
import { userContext } from "../layouts/MainLayout";
import InputField from "../components/InputField";
import Axios from "../axios.config";
import { document } from "postcss";
const Profile = () => {
    const {user, setUser} = useContext(userContext);
    const [name, setName] = useState(user.name);
    const [about, setAbout] = useState(user.about);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

    const [editing, setEditing] = useState(null); // can take one of the values [ "name", "about", "phoneNumber" ]

    const infos = [
        {
            id: 0,
            state: name,
            setState: setName,
            stateName: "name",
            icon: <FaUser />
        },
        {
            id: 1,
            state: about,
            setState: setAbout,
            stateName: "about",
            icon: <FaInfoCircle />
        },
        {
            id: 2,
            state: phoneNumber,
            setState: setPhoneNumber,
            stateName: "phoneNumber",
            icon: <FaPhoneAlt />
        },
    ];
const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  // Handle file upload
  const setProfilePicture = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    try {
      // Fetch pre-signed URL
      const res = await Axios.get('/user/get_presigned_url');
      const presignedUrl = res.data.presignedUrl;
      console.log('Pre-signed URL:', presignedUrl);

      // Upload file using the pre-signed URL
      const minioRes = await Axios.put(presignedUrl, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type
        }
      });

      console.log('File uploaded successfully:', minioRes);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload file');
    }
  };
    return (
        <div className="flex-1 bg-gray-50 dark:bg-dark-primary p-16">
            <div className="max-w-2xl mx-auto">
<input type="file" id="myfile" name="myfile" onChange={handleFileChange} />
        <button type="button" onClick={setProfilePicture} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Upload File
        </button>
        {selectedFile && (
          <div className="mt-4">
            <p>Selected file: {selectedFile.name}</p>
            <p>File size: {selectedFile.size} bytes</p>
            <p>File type: {selectedFile.type}</p>
          </div>
        )}
                <div className="justify-self-center rounded-full w-40 h-40 mt-6 mb-6">
                    <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Profile"
                        className="w-36 h-36 rounded-full object-cover"
                    />
                    <button className="flex-1 relative bottom-8 left-24 w-8 h-8 rounded-full bg-secondary-dark dark:bg-darkMessage-user text-white dark:text-darkText-secondary"
                        onClick={ setProfilePicture }
                    >
                        <FaPen className="align-middle justify-self-center"/>
                    </button>
                </div>
                {
                    infos.map((item) => (
                        <InfoCard key={item.id} {...item} editing={editing} setEditing={setEditing}/>
                    ))
                }
            </div>
        </div>
    );
}

const InfoCard = ( {state, setState, stateName, icon, editing, setEditing }) => {
    return (
        <div className="flex justify-between bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6 w-full h-fit">
            <div>
                <div className="flex items-center mb-6">
                    <span className="text-secondary text-xl mr-3">{icon}</span>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-darkText-secondary">{stateName}</h2>
                </div>

                <div className="flex items-center mb-6">
                    <div className="ml-6">
                        { (editing === stateName) ? (
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                setEditing(null);
                            }}>
                                <InputField state={state} setState={setState} value={state} placeHolder={""} /> 
                            </form>
                        )
                            : <h3 className="font-medium text-gray-800 dark:text-darkText-secondary">{state ? state : "null"}</h3>
                        }
                    </div>
                </div>

            </div>
            <div className='self-center'>
                <button className='relative flex flex-col justify-center align-middle w-16 h-10 rounded-lg bg-secondary dark:bg-darkMessage-user'
                    onClick={() => {
                        setEditing(stateName);
                    }}
                >
                    {
                        state ? <FaPen className='text-white dark:text-darkText-secondary  self-center w-5 h-5'/>
                        : <FaPlus className='text-white dark:text-darkText-secondary  self-center w-5 h-5'/>
                    }
                                    </button>
            </div>
        </div>
    )
}
export default Profile;
