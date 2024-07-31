// PriceChangeGraph.js
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Modal from "react-modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChangeGraph = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup chart instance on component unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-gray-900 border-gray-700 w-96  h-56 mt-2 p-2">
      <div onClick={() => setModalIsOpen(true)} className="cursor-pointer">
        <div className="text-blue-500 mt-2">Narxning o'zgarishi </div>
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Price Analysis"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName=""
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl mb-4">6 oylik narx diogrammasi</h2>
          <Line ref={chartRef} data={data} options={options} />
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Yopish
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PriceChangeGraph;
