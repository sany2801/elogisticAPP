/* eslint-disable react/jsx-pascal-case */
import { useState, useRef } from "react";
import ItemContentInfo from "../../components/ItemContentInfo/ItemContentInfo";
import { useSelector } from "react-redux";
import InputInfo from "../../components/InputInfo/InputInfo";
import AddressEditing from "../../components/AddressEditing/AddressEditing";
import house_icon from "../../images/house_icon.png";
import key_icon from "../../images/key-square.png";
import DeleteAccountIcon from '../../images/DeleteAccountIcon.png'
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import AccountItem from '../../components/AccountItem/AccountItem';
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import PopapModal from "../../components/PopapModal/PopapModal";
import VerifyNumber from '../VerifyNumber/VerifyNumber';
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {

  const [is_active_modal_address, setIs_active_modal_address] = useState<boolean>(false);
  const [is_active_modal_pass, setIs_active_modal_pass] = useState<boolean>(false);
  const [is_active_modal_delete_account, setIs_active_modal_delete_account] = useState<boolean>(false);
  const [is_change_input, setIs_change_input] = useState<boolean>(false);
  const [is_change_edit, setIs_change_edit] = useState<boolean>(false)
  const refFirstName = useRef<HTMLDivElement | null>(null);
  const refLastName = useRef<HTMLDivElement | null>(null);
  const refEmail = useRef<HTMLDivElement | null>(null);
  const refPhone = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  function handle_address_modal(): void {
    setIs_active_modal_address((prev: boolean) => !prev);
  }

  function handle_password_modal(): void {
    setIs_active_modal_pass((prev: boolean) => !prev);
  }

  function getStateInputChange(value: boolean): void {
    setIs_change_input(value);
  }

  function getStateEdit(value: boolean): void {
    setIs_change_edit(value);
  }

  const userData = useSelector((state: any) => state.data.userInfo);

  if (!userData || !userData.userprofile) {
    return null;
  }

  const handleDeleteAccount = () => {
    setIs_active_modal_delete_account((prev: boolean) => !prev);
  }

  const handleLogOut = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  }

  return (
    <div className={styles.content_info}>
      <div id={styles.head}>
        <h2>Account settings</h2>
        <WhiteButton
          setState={handleLogOut}
          button_text={"Log out"}
          width={140}
          height={40}
        />
      </div>

      <ItemContentInfo
        setState={() => {
        }}
        nameRef={refFirstName}
        lastNameRef={refLastName}
        title="Personal Information"
        inputState={is_change_input}
        inputStateChang={getStateInputChange}
        buttonStateEdit={getStateEdit}
        classNameEdit={styles.editBtn}
      >
        {!userData.phone_verified ? <VerifyNumber /> : ""}

        <InputInfo
          value={userData.userprofile.first_name}
          title="First Name"
          className=""
          inputStateChang={getStateInputChange}
          ref={refFirstName}
        />
        <InputInfo
          value={userData.userprofile.last_name}
          title="Last Name"
          className=""
          inputStateChang={getStateInputChange}
          ref={refLastName}
        />
        <InputInfo value={userData.email} title="Email" className="" ref={refEmail} editState={is_change_edit} />
        <InputInfo
          value={userData.phone_number}
          title="Phone number"
          ref={refPhone}
          editState={is_change_edit}
          className=""
        />
      </ItemContentInfo>
      {userData.userprofile.company_name ? (
        <ItemContentInfo
          setState={() => {
          }}
          title="Company Information"
          classNameEdit={styles.editBtn}
        >
          <InputInfo
            value={userData.userprofile.company_name}
            title="Company name"
            className=""
            editState={is_change_edit}
          />
          <InputInfo
            value={userData.email}
            title="Company Email"
            className=""
          />
        </ItemContentInfo>
      ) : null}

      <AccountItem
        title={"Address"}
        img_src={house_icon}
        address={userData.address}
        setState={handle_address_modal}
      >
        <AddressEditing
          is_active_modal={is_active_modal_address}
          setIs_active_modal={setIs_active_modal_address}
        />
      </AccountItem>

      <AccountItem
        title={"Change password"}
        img_src={key_icon}
        setState={handle_password_modal}
      >
        <PopapModal active={is_active_modal_pass} setActive={setIs_active_modal_pass}
          children={<ChangePassword active={is_active_modal_pass} />} />
      </AccountItem>
      <AccountItem
        title={"Delete Account"}
        img_src={DeleteAccountIcon}
        setState={handleDeleteAccount}
      >
        <PopapModal active={is_active_modal_delete_account} setActive={setIs_active_modal_delete_account}
          children={<DeleteAccount />} />
      </AccountItem>
    </div>

  );
};

export default Profile;
