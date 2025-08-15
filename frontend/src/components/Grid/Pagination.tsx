import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null; // Não mostra se só tem 1 página

  const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 12 }}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          backgroundColor: currentPage === 1 ? '#f0f0f0' : '#fff',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #007bff',
            backgroundColor: page === currentPage ? '#007bff' : '#fff',
            color: page === currentPage ? '#fff' : '#007bff',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          backgroundColor: currentPage === totalPages ? '#f0f0f0' : '#fff',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
