import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const getSettings = () => {
    const savedSettings = localStorage.getItem('simulation-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      openaiApiKey: '',
      conversationModel: 'o3-2025-04-16',
      insightModel: 'o3-2025-04-16',
      maxConcurrentSimulations: 4,
    };
  };

  const updateSetting = (key: string, value: any) => {
    const settings = getSettings();
    settings[key] = value;
    localStorage.setItem('simulation-settings', JSON.stringify(settings));
  };

  const settings = getSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Simulation Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={settings.openaiApiKey}
                  onChange={(e) => updateSetting('openaiApiKey', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your API key is stored locally and never sent to our servers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Conversation Agent Model</Label>
                  <Select 
                    value={settings.conversationModel} 
                    onValueChange={(value) => updateSetting('conversationModel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="o3-2025-04-16">O3 (Recommended)</SelectItem>
                      <SelectItem value="o4-mini-2025-04-16">O4 Mini (Fast)</SelectItem>
                      <SelectItem value="gpt-4.1-2025-04-14">GPT-4.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Insight Generation Model</Label>
                  <Select 
                    value={settings.insightModel} 
                    onValueChange={(value) => updateSetting('insightModel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="o3-2025-04-16">O3 (Recommended)</SelectItem>
                      <SelectItem value="o4-mini-2025-04-16">O4 Mini (Fast)</SelectItem>
                      <SelectItem value="gpt-4.1-2025-04-14">GPT-4.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
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
                  onChange={(e) => updateSetting('maxConcurrentSimulations', parseInt(e.target.value) || 1)}
                />
                <p className="text-sm text-muted-foreground">
                  Number of personas to simulate simultaneously (1-10)
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;