import {useState} from "react";
import FriendsList from "./components/FriendsList";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";
import FormAddFriend from "./components/FormAddClient";
import initialFriends from "./components/initialFriends";

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriend() {
        setShowAddFriend(show => !show);
    }

    function handleAddFriend(friend) {
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false);
    }

    function handleSelection(friend) {
        setSelectedFriend(cur => cur?.id === friend.id ? null : friend);
        setShowAddFriend(false)
    }

    function handleSplitBill(value) {
        setFriends(friends =>
            friends.map(friend => friend.id === selectedFriend.id
                ? {...friend, balance: friend.balance + value}
                : friend))

        setSelectedFriend(null)
    }

    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
                    onSelection={handleSelection}/>

                {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}

                <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
            </div>

            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                    key={selectedFriend.id}
                />
            )}
        </div>
    )
}


//My
// const initialFriends = [
//     {
//         id: 118836,
//         name: "Clark",
//         image: "https://i.pravatar.cc/48?u=118836",
//         balance: -7,
//     },
//     {
//         id: 933372,
//         name: "Sarah",
//         image: "https://i.pravatar.cc/48?u=933372",
//         balance: 20,
//     },
//     {
//         id: 499476,
//         name: "Anthony",
//         image: "https://i.pravatar.cc/48?u=499476",
//         balance: 0,
//     },
// ];
//
//
// export default function App() {
//     const [friends,setFriends]=useState([...initialFriends]);
//     const [isAddButtonClicked,setIsAddButtonClicked]=useState(false)
//
//     function handleAddFriendButton(){
//         setIsAddButtonClicked(cur=>!cur)
//     }
//     function handleToAddNewFriend(e,name,image){
//         e.preventDefault();
//       const newFriend={
//           id:Date.now(),
//           name:e.target[0].value,
//           image:e.target[1].value
//       }
//         setFriends(friends=>[...friends,newFriend])
//
//     }
//
//     return (
//         <div className="App">
//             <FriendsList data={friends} />
//             {isAddButtonClicked ? <FormToAddFriend addNewFriend={handleToAddNewFriend} onButton={handleAddFriendButton} isButtonClicked={isAddButtonClicked}/> : <button onClick={handleAddFriendButton}>Add Friend</button>  }
//         </div>
//     );
// }
//
// function FriendsList({data}) {
//     return (
//         <>
//             <ul>{data.map((friend,id) => <Friend key={friend.id} name={friend.name} image={friend.image} balance={friend.balance} id={id}/>
//
//             )}</ul>
//
//         </>
//
//     )
// }
//
// function Friend({name, balance, image,id}) {
//     const [isFriendSelected, setIsFriendSelected] = useState(false);
//
//
//     function handleButton() {
//         setIsFriendSelected((current) => !current)
//     }
//     return (
//         <div>
//             <h1>{name}</h1>
//             <img src={image} alt={name}/>
//             <span>
//                 {balance===0 && 'We are even'}
//                 {balance>0 && `I own you ${balance}`}
//                 {balance<0 && `You own me ${Math.abs(balance)}`}
//             </span>
//             <button onClick={handleButton}>{isFriendSelected ? 'Close' : 'Select'}</button>
//             {isFriendSelected &&   <FormToSplitTheBill name={name}/>}
//         </div>
//     )
// }
//
// function FormToAddFriend({addNewFriend,onButton,isButtonClicked}) {
//     const [name,setName]=useState('');
//     const [image,setImage]=useState('');
//
//     return (
//         <div>
//         <form className='form-add-friend' onSubmit={addNewFriend}>
//                 <label>Friend name
//                     <input value={name} placeholder='name' onChange={(e)=>setName(e.target.value)}/>
//                 </label>
//                 <label>Image URL
//                     <input value={image} placeholder='image' onChange={(e)=>setImage(e.target.value)}/>
//                 </label>
//                 <button>Add</button>
//             </form>
//             <button onClick={onButton}>{isButtonClicked ? 'Close' : 'Add friend' }</button>
//         </div>
//
//     )
// }
//
// function FormToSplitTheBill({name}) {
//     const [billValue,setBillValue]=useState(0);
//     const [yourExpance,setYourExpance]=useState(0)
//
//     const yourFriendPart=billValue - yourExpance;
//     return (
//         <div>
//             <form className='form-split-bill'> SPLIT A BILL WITH {name}
//                 <label>Bill value
//                     <input value={billValue} onChange={(e)=>setBillValue(Number(e.target.value))}/>
//                 </label>
//                 <label>Your expense
//                     <input value={yourExpance} onChange={e=>setYourExpance(Number(e.target.value))}/>
//                 </label>
//                 <span >{name}'s expense
//                     {yourFriendPart}
//                 </span>
//                 <select>Who is paying the bill?
//                     <option>you</option>
//                     <option>{name}</option>
//                 </select>
//                 <button>Split bill</button>
//             </form>
//         </div>
//
//     )
// }
//
