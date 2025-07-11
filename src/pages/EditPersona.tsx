import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PersonaForm } from "@/components/PersonaForm";
import { Persona } from "@/components/PersonaCard";
import { mockPersonas } from "@/data/mockPersonas";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditPersona() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [persona, setPersona] = useState<Persona | undefined>();

  useEffect(() => {
    if (id) {
      const foundPersona = mockPersonas.find(p => p.id === id);
      setPersona(foundPersona);
    }
  }, [id]);

  const handleSave = (updatedPersona: Persona) => {
    // TODO: Update persona in state/storage
    console.log('Saving persona:', updatedPersona);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!persona) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Persona not found</h2>
          <p className="text-muted-foreground">The persona you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Persona</h1>
          <p className="text-muted-foreground">Update {persona.name}'s information</p>
        </div>
      </div>

      <PersonaForm
        persona={persona}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}