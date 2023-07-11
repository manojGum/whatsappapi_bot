import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AddDataContext = createContext();
export const AddDataContextProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionId, setsuggestionId] = useState();
    const [formData, setFormData] = useState({
      infoType: "",
      question: "",
      inthub: false,
      answer: {
        text: "",
        link: "",
        filename: "",
        caption: "",
      },
      buttons: {
        responsetext: "",
        buttonslist: [
          {
            title: "",
          },
        ],
      },
      list: {
        responsetext: "",
        listheading: " ",
        buttonslist: [{ title: "", description: "" }],
      },
      location: {
        latitude: "",
        longitude: "",
        name: "",
        address: "",
      },
      followUp: [
        {
          question: "",
          response: "",
        },
      ],
    });
    const [selectedValue, setSelectedValue] = useState("");
  
    const listCountHandleChange = (event) => {
      formData.list.buttonslist.push({ title: "", description: "" });
      setSelectedValue({ title: "", description: "" });
    };
  
    const handleremoveListCount = (index) => {
      formData.list.buttonslist.pop(index);
      setSelectedValue({ title: "", description: "" });
    };
  
    const buttonCountHandleChange = (event) => {
      formData.buttons.buttonslist.push({
        title: "",
      });
      setSelectedValue({
        title: "",
      });
    };
    const handleremoveButtonCount = (index) => {
      formData.buttons.buttonslist.pop(index);
      setSelectedValue({
        title: "",
      });
      setSelectedValue({
        title: "",
      });
    };
  
    const followUpCountHandleChange = () => {
      formData.followUp.push({
        question: "",
        response: "",
      });
      setSelectedValue({
        question: "",
        response: "",
      });
    };
  
    const handleremove = (index) => {
      formData.followUp.pop(index);
      setSelectedValue({
        question: "",
        response: "",
      });
    };
    const handleButtonChange = (e, index) => {
      const { value } = e.target;
      const updatedFormData = {
        ...formData,
        buttons: {
          ...formData.buttons,
          buttonslist: formData?.buttons.buttonslist.map((button, idx) =>
            idx === index ? { ...button, title: value } : button
          ),
        },
      };
      setFormData(updatedFormData);
    };
    const handleListChange = (e, index) => {
      const { name, value } = e.target;
      const updatedFormData = {
        ...formData,
        list: {
          ...formData.list,
          buttonslist: formData?.list.buttonslist.map((button, idx) =>
            idx === index ? { ...button, [name]: value } : button
          ),
        },
      };
      setFormData(updatedFormData);
    };
  
    const handleFlowupChange = async (e, index) => {
      const { name, value } = e.target;
      setsuggestionId(index);
      const updatedFormData = {
        ...formData,
        ...formData.followUp,
        followUp: formData?.followUp.map((followup, idx) =>
          idx === index ? { ...followup, [name]: value } : followup
        ),
      };
  
      getData(formData.followUp[index].question).then((res) =>
        setSuggestions(res.data)
      );
  
      setFormData(updatedFormData);
    };
  
    const [infoTypeOptions, setInfoTypeOptions] = useState([]);
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/infotype`)
        .then((response) => response.json())
        .then((data) => {
          setInfoTypeOptions(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    function getData(keyw) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/addinfo/autocomplete/${keyw}`
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    }
  
    const handleChange = async (e) => {
      let { name, value } = e.target;
      if (e.target.name === "inthub") {
        name = "inthub";
        value = e.target.checked;
      }
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleChangee = (e, index) => {
      const value = e;
      const updatedFormData = {
        ...formData,
        ...formData.followUp,
        followUp: formData?.followUp.map((followup, idx) =>
          idx === index ? { ...followup, question: value } : followup
        ),
      };
      setFormData(updatedFormData);
      setSuggestions([]);
    };
    return (<AddDataContext.Provider value={{formData,setFormData,infoTypeOptions,handleChange,handleButtonChange,buttonCountHandleChange,handleremoveButtonCount,handleListChange,listCountHandleChange,handleremoveListCount,suggestionId,suggestions,handleFlowupChange,followUpCountHandleChange,handleChangee,handleremove}}>{children}</AddDataContext.Provider>)
}