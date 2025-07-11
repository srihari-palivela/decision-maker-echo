import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, Key, Brain, Eye } from 'lucide-react';

interface SettingsData {
  openaiApiKey: string;
  conversationModel: string;
  insightModel: string;
  maxConcurrentSimulations: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    openaiApiKey: '',
    conversationModel: 'o3-2025-04-16',
    insightModel: 'o3-2025-04-16',
    maxConcurrentSimulations: 4,
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('simulation-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('simulation-settings', JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your simulation settings have been updated.",
    });
  };

  const models = [
    { value: 'o3-2025-04-16', label: 'O3 (Recommended)' },
    { value: 'o4-mini-2025-04-16', label: 'O4 Mini (Fast)' },
    { value: 'gpt-4.1-2025-04-14', label: 'GPT-4.1' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Key className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Simulation Settings</h1>
          <p className="text-muted-foreground">Configure AI models and API keys for persona simulations</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={settings.openaiApiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, openaiApiKey: e.target.value }))}
              />
              <p className="text-sm text-muted-foreground">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Model Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Conversation Agent Model</Label>
                <Select 
                  value={settings.conversationModel} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, conversationModel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Model used for persona conversation simulation
                </p>
              </div>

              <div className="space-y-2">
                <Label>Insight Generation Model</Label>
                <Select 
                  value={settings.insightModel} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, insightModel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Model used for analyzing conversations and generating insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Performance Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxConcurrent">Max Concurrent Simulations</Label>
              <Input
                id="maxConcurrent"
                type="number"
                min="1"
                max="10"
                value={settings.maxConcurrentSimulations}
                onChange={(e) => setSettings(prev => ({ ...prev, maxConcurrentSimulations: parseInt(e.target.value) || 1 }))}
              />
              <p className="text-sm text-muted-foreground">
                Number of personas to simulate simultaneously (1-10)
              </p>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;