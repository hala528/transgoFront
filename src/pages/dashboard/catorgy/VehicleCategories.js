import { useState, useEffect } from "react";
import { Axios } from "../../../api/axios";
import {
  VEHICLE_CATEGORIES,
  EDIT_VEHICLE_CATEGORY,
  TOGGLE_VEHICLE_CATEGORY_STATUS
} from "../../../api/api";
import "./vehicleCategories.css";
import { Form, Modal,Button } from "react-bootstrap";

export default function VehicleCategories() {

  const [showModal, setShowModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price_per_km: "",
    is_active: true,
  });


  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggleCategoryStatus = async (item) => {
  try {

    const res = await Axios.patch(
      TOGGLE_VEHICLE_CATEGORY_STATUS(item.category_id)
    );


    setCategories((prev) =>
      prev.map((category) =>
        category.category_id === item.category_id
          ? res.data.data
          : category
      )
    );


  } catch (err) {

    console.log(err);

  }
};


  const getCategories = async () => {
    try {

      setLoading(true);

      const res = await Axios.get(VEHICLE_CATEGORIES);

      setCategories(res.data.data.items || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);



  const openEditModal = (item) => {

    console.log("EDIT:", item);

    setSelectedCategory(item);

    setFormData({
      name: item.name,
      price_per_km: item.price_per_km,
      is_active: item.is_active,
    });

    setShowModal(true);
  };




  const openAddModal = () => {

    setSelectedCategory(null);

    setFormData({
      name: "",
      price_per_km: "",
      is_active: true,
    });

    setShowModal(true);
  };





  const updateCategory = async () => {

    try {

      const res = await Axios.patch(
        EDIT_VEHICLE_CATEGORY(
          selectedCategory.category_id
        ),
        {
          name: formData.name,
          price_per_km: Number(formData.price_per_km),
          is_active: formData.is_active,
        }
      );


      setCategories((prev)=>
        prev.map((item)=>
          item.category_id === selectedCategory.category_id
            ? res.data.data
            : item
        )
      );


      setShowModal(false);
      setSelectedCategory(null);


    } catch(err){

      console.log(err);

    }

  };




  if(loading){

    return (
      <div className="vehicle-page">
        <h2>Loading...</h2>
      </div>
    );

  }



  return (

    <div className="w-100 p-2">


      <div className="vehicle-page">


        <div className="vehicle-header">

          <div>

            <h2>
              Vehicle Categories
            </h2>

            <p>
              Manage all vehicle categories and pricing
            </p>

          </div>



          <button
            className="add-btn"
            onClick={openAddModal}
          >
            + Add Category
          </button>


        </div>





        <div className="stats-grid">


          <div className="stat-card">

            <h4>Total Categories</h4>

            <h2>
              {categories.length}
            </h2>

          </div>




          <div className="stat-card active">

            <h4>Active</h4>

            <h2>
              {
                categories.filter(
                  item=>item.is_active
                ).length
              }
            </h2>

          </div>




          <div className="stat-card inactive">

            <h4>Inactive</h4>

            <h2>
              {
                categories.filter(
                  item=>!item.is_active
                ).length
              }
            </h2>

          </div>




          <div className="stat-card">

            <h4>
              Average Price / KM
            </h4>


            <h2>

            {
              categories.length
              ?
              (
                categories.reduce(
                  (sum,item)=>
                    sum + Number(item.price_per_km),
                  0
                )
                /
                categories.length
              ).toFixed(1)
              :
              0
            }

            </h2>

          </div>


        </div>






        <div className="table-card">


          <table>


            <thead>

              <tr>

                <th>Name</th>

                <th>
                  Price / KM
                </th>

                <th>Status</th>

                <th>Updated</th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>





            <tbody>


            {
              categories.length === 0 ?

              (

                <tr>

                  <td colSpan="5">
                    No Categories Found
                  </td>

                </tr>

              )


              :

              categories.map(item=>(


                <tr key={item.category_id}>


                  <td>
                    {item.name}
                  </td>



                  <td>
                    {item.price_per_km} SP
                  </td>



                  <td>

                    <span
                      className={
                        item.is_active
                        ?
                        "status active"
                        :
                        "status inactive"
                      }
                    >

                    {
                      item.is_active
                      ?
                      "Active"
                      :
                      "Inactive"
                    }

                    </span>

                  </td>



                  <td>

                    {
                      new Date(
                        item.updated_at
                      ).toLocaleDateString()
                    }

                  </td>



                  <td>


                    <button
                      className="edit-btn"
                      onClick={()=>
                        openEditModal(item)
                      }
                    >
                      Edit
                    </button>



                    <button
  className={
    item.is_active
      ? "disable-btn"
      : "enable-btn"
  }

  onClick={() => toggleCategoryStatus(item)}

>

  {item.is_active
    ? "Disable"
    : "Enable"}

</button>


                  </td>



                </tr>


              ))

            }


            </tbody>


          </table>


        </div>



      </div>






      <Modal
  show={showModal}
  onHide={() => {
    setShowModal(false);
    setSelectedCategory(null);
  }}
  centered
>

  <Modal.Header closeButton>

    <Modal.Title style={{ fontWeight: "bold",color:"white" }}>
      {selectedCategory
        ? "Edit Category"
        : "Add Category"}
    </Modal.Title>

  </Modal.Header>



  <Modal.Body>


    <Form>


      <Form.Group className="mb-3">

        <Form.Label style={{ fontWeight: "bold",color:"white" }}> 
          Name
        </Form.Label>


        <Form.Control

          type="text"

          placeholder="Category Name"

          value={formData.name}

          onChange={(e)=>
            setFormData({
              ...formData,
              name:e.target.value
            })
          }

        />


      </Form.Group>





      <Form.Group className="mb-3">

        <Form.Label style={{ fontWeight: "bold",color:"white" }}>
          Price Per KM
        </Form.Label>


        <Form.Control

          type="number"

          placeholder="0.00"

          value={formData.price_per_km}

          onChange={(e)=>
            setFormData({
              ...formData,
              price_per_km:e.target.value
            })
          }

        />


      </Form.Group>





      <Form.Group className="mb-3">

        <Form.Label style={{ fontWeight: "bold",color:"white" }}>
          Status
        </Form.Label>


        <Form.Select

          value={formData.is_active}

          onChange={(e)=>
            setFormData({
              ...formData,
              is_active:
                e.target.value === "true"
            })
          }

        >

          <option value="true">
            Active
          </option>


          <option value="false">
            Inactive
          </option>


        </Form.Select>


      </Form.Group>



    </Form>


  </Modal.Body>




  <Modal.Footer>


    <Button

      variant="secondary"

      onClick={()=>{
        setShowModal(false);
        setSelectedCategory(null);
      }}

    >
      Cancel

    </Button>





    <Button

      variant="primary"

      onClick={updateCategory}

    >

      Save

    </Button>



  </Modal.Footer>


</Modal>



    </div>

  );

}