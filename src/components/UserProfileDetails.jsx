import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";

function UserProfileDetails() {
  const user = useSelector((state) => state.user?.user);
  const [menu, setMenu] = useState(false);
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div
        className="w-14 h-14 flex items-center justify-center rounded-xl
        overflow-hidden cursor-pointer bg-emerald-500"
      >
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-full h-full object-cover"
            ></motion.img>
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>

      <motion.div
        onClick={() => setMenu(!menu)}
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center cursor-pointer bg-secondary"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>

      <AnimatePresence>
        {menu && (
          <motion.div
            key={"AlertMessage"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-secondary absolute top-16 right-0 rounded-xl shadow-md z-10
            flex px-4 py-3 flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus &&
              Menus.map((menu) => {
                return (
                  <Link
                    to={menu.url}
                    key={menu.id}
                    className="text-primaryText text-lg px-2 py-1 w-full rounded-md hover:bg-slate-800"
                  >
                    {menu.name}
                  </Link>
                );
              })}

            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-primaryText text-lg px-2 py-1 w-full rounded-md hover:bg-slate-800"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserProfileDetails;
