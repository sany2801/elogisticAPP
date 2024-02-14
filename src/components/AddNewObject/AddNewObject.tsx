import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import galery from "../../images/gallery-add.svg";
import deleteIcon from "../../images/delete_bin.svg";
import CustomInput from "../CustomInput/CustomInput";
import DefaultButton from "../DefaultButton/DefaultButton";
import { ObjType } from "../AddParcel/AddParcel";
import axios, { AxiosResponse } from "axios";
import Loader from "../Loader/Loader";
import css from "./AddNewObject.module.css";

type AddNewObjectProps = {
  createObject: (
    newObject: any
  ) => Promise<AxiosResponse<any, any> | undefined>;
  setActiveModalNewObj: (active: boolean) => void;
  getAllItems: () => void;
  chosenSizes: [number, number, number] | [];
  editedObj?: ObjType;
  setEditedObj?: (obj: ObjType | undefined) => void;
  orderNumber: string;
};

const AddNewObject: React.FC<AddNewObjectProps> = ({
  createObject,
  setActiveModalNewObj,
  getAllItems,
  chosenSizes,
  editedObj,
  setEditedObj,
  orderNumber,
}) => {
  const [image, setImage] = useState<File>();
  const [imgArray, setImgArray] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [w, setW] = useState<string>("");
  const [h, setH] = useState<string>("");
  const [l, setL] = useState<string>("");
  const [chosenImgIndex, setChosenImgIndex] = useState<0 | 1 | 2 | 3>(0);
  const [units, setUnits] = useState<"cm" | "in">("cm");

  const isFormValid: boolean =
    name !== "" && +quantity > 0 && w !== "" && h !== "" && l !== "";


  const passedOrderNumber = sessionStorage.getItem("passedOrderNumber");

  const clearForm = () => {
    setImage(undefined);
    setImgArray([]);
    setName("");
    setQuantity("");
    setWeight("");
    setComment("");
    setL("");
    setW("");
    setH("");
  };

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files.length > 1) {
        for (
          let i = 0;
          i < e.target.files.length && i < 4 - imgArray.length;
          i++
        ) {
          const img = e.target.files[i];
          if (img) {
            setImgArray((prev) => [...prev, img]);
          }
        }
      } else {
        setImage(e.target.files[0]);
      }
    }


  };

  useEffect(() => {
    if (image) {
      setImgArray((imgArray) => [image, ...imgArray.filter(Boolean)]);
    }
  }, [image]);

  const handleName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleWeight = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const value = e.target.value.toString();
    if (parseInt(value) >= 0) {
      setWeight(e.target.value);
    }
  };

  const handleQuantity = (e: {
    target: { value: { toString: () => any } };
  }) => {
    const value = e.target.value.toString();
    if (parseInt(value) >= 0) {
      setQuantity(value);
    }
  };

  const handleW = (e: { target: { value: { toString: () => any } } }) => {
    const value = e.target.value.toString();
    if (parseInt(value) >= 0) {
      setW(value);
    }
  };

  const handleL = (e: { target: { value: { toString: () => any } } }) => {
    const value = e.target.value.toString();
    if (parseInt(value) >= 0) {
      setL(value);
    }
  };

  const handleH = (e: { target: { value: { toString: () => any } } }) => {
    const value = e.target.value.toString();
    if (parseInt(value) >= 0) {
      setH(value);
    }
  };

  const handleComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const getObj = (): any => {
    const warning =
      units === "cm"
        ? chosenSizes.some(
          (size: number) => size < +l || size < +w || size < +h
        )
        : chosenSizes.some(
          (size: number) =>
            size < +l * 2.54 || size < +w * 2.54 || size < +h * 2.54
        );

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("height", h);
    formData.append("length", l);
    formData.append("measure_unit", units);
    formData.append("object_name", name);
    formData.append("quantity", quantity);
    formData.append("size_warning", warning.toString());
    formData.append("weight", weight === "" ? "0" : weight);
    formData.append("width", w);

    if (imgArray.at(0)) {
      formData.append("first_photo", imgArray.at(0)!);
    }
    if (imgArray.at(1)) {
      formData.append("second_photo", imgArray.at(1)!);
    }
    if (imgArray.at(2)) {
      formData.append("third_photo", imgArray.at(2)!);
    }
    if (imgArray.at(3)) {
      formData.append("fourth_photo", imgArray.at(3)!);
    }

    return formData;
  };

  const handleCreate = async () => {
    console.log(image)



    if (isFormValid) {
      setIsLoading(true);
      try {
        const result = await createObject(getObj());
        if (result) {
          getAllItems();
          setActiveModalNewObj(false);
          setIsLoading(false);
          clearForm();
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const updateObject = async (object: any) => {
    try {
      const response = await axios.patch(
        `https://elogistapp-backend.herokuapp.com/orders/update_transportation_items/${passedOrderNumber || orderNumber
        }/${editedObj?.box_id}/${editedObj?.items_id}/`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      alert("Something went wrong, please try again");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (isFormValid) {
      setIsLoading(true);
      try {
        const result = await updateObject(getObj());
        if (result) {
          if (setEditedObj) {
            setEditedObj(undefined);
          }
          getAllItems();
          setActiveModalNewObj(false);
          setIsLoading(false);
          clearForm();
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const handleChooseImg = (index: 0 | 1 | 2 | 3) => {
    setChosenImgIndex(index);
  };

  const handleDeleteImg = (index: 0 | 1 | 2 | 3) => {
    if (index === imgArray.length - 1) {
      setChosenImgIndex(0);
    }
    setImgArray((prev) => prev.filter((img, i) => i !== index));
  };

  const handleShow = () => {
    setIsShown(true);
  };

  const handleHide = () => {
    setIsShown(false);
  };

  const handleUnit = () => {
    setUnits((prev) => (prev === "cm" ? "in" : "cm"));
  };

  useEffect(() => {
    if (editedObj) {
      setName(editedObj.object_name);
      setQuantity(editedObj.quantity.toString());
      setWeight(editedObj.weight.toString());
      setL(editedObj.length.toString());
      setH(editedObj.height.toString());
      setW(editedObj.width.toString());
      setComment(editedObj.comment);
      setUnits(editedObj.measure_unit);
    } else {
      clearForm();
    }
  }, [editedObj]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <span className={css.title}>Add new object</span>

      <div className={css.photoCounter}>
        <span className={css.counterTitle}>Photos</span>
        <div className={css.counter}>{imgArray.length}/4</div>
      </div>

      {imgArray.length > 0 ? (
        <>
          <div
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
            id={css.imgWrap}
          >
            {imgArray.at(chosenImgIndex) && (
              <img
                src={URL.createObjectURL(imgArray?.[chosenImgIndex])}
                alt="User"
              />
            )}
            <div
              style={isShown ? {} : { display: "none" }}
              onClick={() => handleDeleteImg(chosenImgIndex)}
              id={css.deleteIconWrap}
            >
              <img src={deleteIcon} alt="delete" />
            </div>
          </div>
          <div id={css.smPhContainer}>
            {imgArray.at(0) && (
              <div
                onClick={() => handleChooseImg(0)}
                className={
                  chosenImgIndex === 0
                    ? `${css.smallPhotoWrap} ${css.chosenSmallPhotoWrap}`
                    : css.smallPhotoWrap
                }
              >
                <img src={URL.createObjectURL(imgArray?.[0])} alt="User" />
              </div>
            )}
            {imgArray.at(1) && (
              <div
                onClick={() => handleChooseImg(1)}
                className={
                  chosenImgIndex === 1
                    ? `${css.smallPhotoWrap} ${css.chosenSmallPhotoWrap}`
                    : css.smallPhotoWrap
                }
              >
                <img src={URL.createObjectURL(imgArray?.[1])} alt="User" />
              </div>
            )}
            {imgArray.at(2) && (
              <div
                onClick={() => handleChooseImg(2)}
                className={
                  chosenImgIndex === 2
                    ? `${css.smallPhotoWrap} ${css.chosenSmallPhotoWrap}`
                    : css.smallPhotoWrap
                }
              >
                <img src={URL.createObjectURL(imgArray?.[2])} alt="User" />
              </div>
            )}
            {imgArray.at(3) && (
              <div
                onClick={() => handleChooseImg(3)}
                className={
                  chosenImgIndex === 3
                    ? `${css.smallPhotoWrap} ${css.chosenSmallPhotoWrap}`
                    : css.smallPhotoWrap
                }
              >
                <img src={URL.createObjectURL(imgArray?.[3])} alt="User" />
              </div>
            )}
            {imgArray.length < 4 && (
              <div onClick={handleImageClick} id={css.addPhoto}>
                <img src={galery} alt="galery" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div onClick={handleImageClick} id={css.photoEmptyField}>
          <img src={galery} alt="galery" />
          <span className={css.counterTitle}>add a photo</span>
          <div id={css.photoText}>
            <span className={css.secondText}>you can add up to 4 photos</span>
            <span className={css.secondText}>file size up to 20 MB</span>
          </div>
        </div>
      )}

      <input
        type="file"
        multiple={true}
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div id={css.infoTitle}>
        <span className={css.counterTitle}>Object information</span>
        <div id={css.unitsWrap}>
          <span id={css.txt}>Units</span>
          <div onClick={handleUnit} id={css.unitsBg}>
            <div className={css.bgText}>cm</div>
            <div className={css.bgText}>in</div>
            <div style={units === "in" ? { left: "26px" } : {}} id={css.unit}>
              {units}
            </div>
          </div>
        </div>
      </div>

      <div id={css.nameWrap}>
        <CustomInput
          isDifferent={true}
          width={"100%"}
          title={"Name*"}
          value={name}
          onChange={handleName}
        />
      </div>

      <div className={css.quantWrap}>
        <CustomInput
          isDifferent={true}
          width={"192px"}
          type={"number"}
          title={"Quantity*"}
          value={quantity}
          onChange={handleQuantity}
        />
        <div className={css.weigthWrap}>
          <CustomInput
            isDifferent={true}
            width={"158px"}
            type={"number"}
            title={"Weight (Optional)"}
            value={weight}
            onChange={handleWeight}
          />
          <span className={css.gr}>gr</span>
        </div>
      </div>

      <div className={css.gabaritesWrap}>
        <div className={css.weigthWrap}>
          <CustomInput
            isDifferent={true}
            width={"88px"}
            type={"number"}
            title={"Width*"}
            value={w}
            onChange={handleW}
          />
          <span className={css.gr}>{units}</span>
        </div>
        <div className={css.weigthWrap}>
          <CustomInput
            isDifferent={true}
            width={"88px"}
            type={"number"}
            title={"Length*"}
            value={l}
            onChange={handleL}
          />
          <span className={css.gr}>{units}</span>
        </div>
        <div className={css.weigthWrap}>
          <CustomInput
            isDifferent={true}
            width={"88px"}
            type={"number"}
            title={"Height*"}
            value={h}
            onChange={handleH}
          />
          <span className={css.gr}>{units}</span>
        </div>
      </div>

      <div>
        <span className={css.secondText}>Comment (optional)</span>
      </div>

      <textarea
        placeholder="Here you can tell us more about the object and your wishes"
        onChange={handleComment}
        id={css.textArea}
        value={comment}
      />

      <div id={css.horizLine} />
      {editedObj ? (
        <DefaultButton
          disabled={!isFormValid}
          setState={handleUpdate}
          button_text={"Update"}
          width={"100%"}
          height={40}
        />
      ) : (
        <DefaultButton
          disabled={!isFormValid}
          setState={handleCreate}
          button_text={"Create"}
          width={"100%"}
          height={40}
        />
      )}
    </>
  );
};

export default AddNewObject;
