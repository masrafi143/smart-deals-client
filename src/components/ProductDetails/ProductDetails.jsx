import React, { use, useEffect, useRef, useState } from "react";
import { data, useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { _id: productId } = useLoaderData();
  //   console.log(product);
  const [bids, setBids] = useState([]);

  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId]);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = parseFloat(e.target.bid.value);
    console.log(productId, name, email, bid);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: parseFloat(bid),
      status: "pending",
    };
    fetch("http://localhost:3000/bids/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('after placing bid', data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a,b)=> b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };
  return (
    <div>
      <h1>details</h1>
      {/* product info */}
      <div>
        <button onClick={handleBidModalOpen} className="btn btn-primary">
          I want to Buy this product
        </button>

        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offer!</h3>
            <p className="py-4">Offer something seller can not resist.</p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                {/* name field */}
                <label className="label">Name</label>
                <input
                  name="name"
                  type="name"
                  className="input"
                  readOnly
                  defaultValue={user?.displayName}
                />
                {/* email field */}
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  readOnly
                  defaultValue={user?.email}
                />
                {/* bid field */}
                <label className="label">Your Bid</label>
                <input
                  name="bid"
                  type="text"
                  className="input"
                  placeholder="Place your bid"
                />
                {/* <div>
                  <a className="link link-hover">Forgot password?</a>
                </div> */}
                <button className="btn btn-neutral mt-4">Place your bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className="text-3xl">
          Bids for this Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL no.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index+1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}
                  </td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
